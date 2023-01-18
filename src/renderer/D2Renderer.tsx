import { Graphics, Stage } from "@inlet/react-pixi";
import { Graphics as GraphicsType } from "@pixi/graphics";
import { useCallback } from "react";
import {  Component, Event } from "./types";

// default context
const context = {
  current: null,
  parent: null,
  events: null,
  colour: {
    source: 0x26a69a,
    destination: 0xf06292,
    expanding: 0xff5722,
    updating: 0xff5722,
    generating: 0xffeb3b,
    closing: 0xb0bec5,
    end: 0xec407a,
  },
  scale: 15,
  fill: 0x000000,
  alpha: 1,
}

type DrawingInstruction = (g:GraphicsType, event:Event) => void;

type InstrinsicComponentsStuff = {[key:string]: (comp:Component) => DrawingInstruction}

type D2RendererProps = {
  parsedComps: Component[],
  eventList: Event[]
}


const scale = (length: number): number => {
  return length * context.scale;
}


function rectDrawingCoverter(component:Component){
  
  return (g:GraphicsType, event:Event) => {

    for (const prop in component){
      if (typeof component[prop] == "function"){
        component[prop] = component[prop](event);
      }
    }
    let color;
    if (event.type in context.colour) {
      color = context.colour[event.type as keyof typeof context.colour];
    }
    if (!color) {
      console.dir(event.type);
    }

    g
      .beginFill(
        event.fill??component.fill??color??0xff5722, 
        event.alpha??component.alpha??context.alpha)
      .drawRect(
        scale(event.x??component.x), 
        scale(event.y??component.y), 
        scale(event.width??component.width??1), 
        scale(event.height??component.height??1)
      )
      .endFill();
  }
}


export function D2Renderer({parsedComps, eventList}:D2RendererProps) {
  /**
   * TODO style the source and destination node
   */
  const inComps:InstrinsicComponentsStuff = {"rect": (comp:Component) => rectDrawingCoverter(comp)}

  const drawInstructions = parsedComps.map((ele:Component) => {
    return inComps[ele["$"]](ele);
  })

  const draw = useCallback((g: GraphicsType) => {
    for (const event of eventList) {
      drawInstructions.forEach((instr:DrawingInstruction)=>instr(g, event))
    }
  }, [eventList, drawInstructions]);

  return (
    <Stage options={{backgroundAlpha: 0}} >
      <Graphics draw={draw} />
    </Stage>
  )
}