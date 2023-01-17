import { Component } from "./types";
import componentMap from "./IntrinsicComponents";

function parseCompProp(val: any) {
  const re = /{{(.*?)}}/g;
  const arr = [...val.matchAll(re)];
  
  return eval.bind(null, )
}

function parseComponent(comp: Component) {
  const intrinsicComp = componentMap[comp["$"]];
  for (let prop in comp) {
    comp[prop] = parseCompProp(comp[prop]);
  }
  return () => {};
}

const Parser = {
  parseCompProp,
  parseComponent
}

export default Parser;
