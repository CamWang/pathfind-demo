import { Render, Components, Component, Views, Context, View } from "./types"
import { primitiveComponents } from "./PrimitiveComponents"
import { isArray } from "lodash";

let renderName: string;

/**
 * Parses all reviews in a Render
 * @param renderDef the render which contains the views to be parsed
 * @returns the parsed Views
 */
export function parseViews(renderDef: Render): Views {
  const views = renderDef.views;
  const userComp = renderDef.components ? renderDef.components : {}
  const userContext = renderDef.context ? renderDef.context : {}


  for (const viewName in views) {
    renderName = views[viewName]["renderer"];
    views[viewName]["components"] = parseComps(views[viewName]["components"], userContext, userComp)
  }

  return views;
}

/**
 * A parser for a list of Components
 * @param components a list of Components
 * @param injectedContext user injected context (from parent Components)
 * @returns a list of parsed Components
 * @todo fix the error handling for required fields
 */
export function parseComps(components: Component[], injectedContext: Context, userComponents: Components): Component[] {

  /**
   * Parses a single Component
   * @param component a individual component
   * @returns a list of parsed Components
   * @todo fix the primitvesComponents and userComponents
   */
  function parseComp(component: Component): Component[] {

    // Checks to see if the name of the component matches a primitive
    if (component["$"] in primitiveComponents) {

      //TODO Make this raise some popup error
      if (renderName != undefined && primitiveComponents[component["$"]]["renderer"] != renderName) {
        console.log("Bad")
      }

      // creates a copy of the component
      const newComp: Component = { ...injectedContext, ...component }

      // goes through all the properties of the component and parses them when necessary
      for (const prop in component) {
        if (prop !== "$"){
          newComp[prop as keyof Component] = parseProperty(component[prop as keyof Component], injectedContext)
        }
      }
      return [newComp]
    }

    // Checks to see if the name of the component matches a user defined component
    else if (component["$"] in userComponents) {

      // When an user component need to recurse down and parse that user defined component
      return parseComps(userComponents[component["$"] as keyof Object],
        { ...injectedContext, ...component }, userComponents)
    }

    else {
      // TODO Error Handling
      console.log("Component by the name of " + component['$'] + " does not exist")
      return []
    }
  }

  const result = components.map(parseComp).flat();
  return result;
}

function arrayOfFunctions(array:Function[], injectedContext:Context){

  return (context: Context) => array.map((ele:Function)=> ele({ ...injectedContext, ...context }))
}

export function parseProperty(val:any, injectedContext:Context){
  switch (typeof val){
    
    case ("string"):
      if (isComputedProp(val)){
        val = parseComputedProp(val)
      }

      break;

    case ("object"):
      if (isArray(val)){
        const newArray = []
        for (const ele of val){
          console.log(ele)
          newArray.push(parseProperty(ele, injectedContext))
        }
        val = newArray
        return arrayOfFunctions(val, injectedContext )
      }
      else{
        for (const prop in val){
          val[prop] = parseProperty(prop, injectedContext)
        }
        break;
      }
  }
  return (context: Context) =>
  // eslint-disable-next-line no-new-func
  Function("context", `return ${val}`)
    ({ ...injectedContext, ...context }) // This combines the two contexts and overridees the injectedContext if duplicate properties

}

/**
 * Parses a computed property into JavaScript code stored in a String.
 * @param val the computed property to be parsed.
 * @returns a string which can be executed as JavaScript
 */
export function parseComputedProp(val: string):string {

  const bracketsReg = /{{(.*?)}}/g;
  const contextStr = "context";
  let isPotNumProp = potRawCompProp(val);

  const varReg = "[a-zA-Z_][a-zA-Z_0-9]*"
  const dotAccReg = `(\\.${varReg})`
  const brackStrReg = `(\\['${varReg}'\\])`
  const brackVarReg = `(\\[${varReg}\\])`
  const brackDollarReg = `(\\[\`(\\\${${varReg}})+\`\\])`
  const remainReg = "(" + dotAccReg + "|" + brackStrReg + "|" + brackVarReg + "|" + brackDollarReg + ")*"

  const tempReg = /\${[a-zA-Z_][a-zA-Z_0-9]*}/g
  const actualReg = new RegExp(varReg + remainReg, "g")

  function parseVariable(str: string) {
    const firstVarReg = /^(.*?)[a-zA-Z_][a-zA-Z_0-9]*/

    return str.replace(new RegExp(brackVarReg, "g"), replaceBrackVar)
      .replace(new RegExp(dotAccReg, "g"), replaceDotAcc)
      .replace(new RegExp(brackDollarReg, "g"), replaceBrackDollar)
      .replace(firstVarReg, replaceFirstVar)
  }

  function replaceFirstVar(str: string, p1: string) {
    return str === contextStr ? contextStr : "context['" + str + "']"
  }

  function replaceDotAcc(str: string, p1: string) {
    return "['" + str.slice(1) + "']"
  }

  function replaceBrackVar(str: string, p1: string) {
    return "[context['" + str.slice(1, -1) + "']]"
  }

  function replaceBrackDollar(str: string, p1: string) {

    function dollarReplace(str: string, p1: string) {
      return "${context['" + str.slice(2, -1) + "']}"
    }
    return str.replace(tempReg, dollarReplace)
  }


  function parseBrackets(str: string, p1: string) {
    return isPotNumProp ? p1.replace(actualReg, parseVariable)
      : "${" + p1.replace(actualReg, parseVariable) + "}"
  }


  val = val.replace(bracketsReg, parseBrackets);

  // if it isnt a number (thus a string) then additional quotations are added
  if (!isPotNumProp) {
    val = `\`${val}\``
  }

  return val
}


/**
 * Checks to see is a property is a computed property.
 * @param val the value of the property to be parsed
 * @returns True if the computed property includes "{{}}", False otherwise
 */
export function isComputedProp(val: any): boolean {
  if (val && typeof val !== "function") {
    if (typeof val !== "string") {
      val = JSON.stringify(val);
    }
    let re = /{{(.*?)}}/g;
    const arr = [...val.matchAll(re)];
    return arr.length !== 0;
  }
  return false;
}


/**
 * Checks to see what type the computed property should be parsed to.
 * If True this means the type will be whatever the type of the property is.
 * If False this means it will be converted into a string.
 * @param val the value of the property to be parsed
 * @returns False if to be parsed to string, True otherwise
 */
export function potRawCompProp(val: any): boolean {
  if (typeof val !== "string") {
    val = JSON.stringify(val);
  }
  let re = /{{(.*?)}}/g;
  const arr = [...val.matchAll(re)];
  return (arr.length === 1) && (arr[0][0] === arr[0].input);
}
