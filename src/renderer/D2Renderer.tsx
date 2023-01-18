import { Graphics, Stage, useApp } from "@inlet/react-pixi";
import { Graphics as GraphicsType } from "@pixi/graphics";
import { useCallback, useEffect } from "react";
import { RenderProps, SearchTrace, Component, Event } from "./types";
import { LineData, RectData, CircleData, Generic2DIntrinsicComponent } from "./PlanarTypes";

const context = {
  current: null,
  parent: null,
  events: null,
  colour: {
    source: 0x26a69a,
    destination: 0xf06292,
    expanding: 0xff5722,
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

    g
      .beginFill(component.fill??0xff5722, component.alpha??context.alpha)
      .drawRect(
        scale(component.x), scale(component.y), scale(component.width??1), scale(component.height??1)
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
  }, [eventList]);

  return (
    <Stage options={{backgroundAlpha: 0}} >
      <Graphics draw={draw} />
    </Stage>
  )
}