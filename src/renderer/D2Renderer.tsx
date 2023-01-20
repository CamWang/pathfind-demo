import { Graphics, Stage } from "@inlet/react-pixi";
import { Graphics as GraphicsType,  } from "@pixi/graphics";
import { useCallback } from "react";
import {  Component, Event, View } from "./types";
import {DrawingInstruction, InstrinsicComponents} from "./PrimitiveComponents"
import * as PIXI from 'pixi.js';

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


type D2RendererProps = {
  parsedComps: View,
  eventList: Event[]
}

const scale = (length: number): number => {
  return length * context.scale;
}

export const D2InstrinsicComponents:InstrinsicComponents = {
  "rect": {
    "converter" : (comp:Component) => rectDrawingCoverter(comp),
    "renderer" : "2D",
  },
  "circle" : {
    "converter" : (comp:Component) => circleDrawingCoverter(comp),
    "renderer" : "2D",
  }
}


function circleDrawingCoverter(component:Component){

  return (g:GraphicsType, event:Event) => {}
}

function rectDrawingCoverter(component:Component){

  
  return (g:GraphicsType, event:Event) => {
    for (const prop in component){
      if (typeof component[prop] == "function"){
        component[prop] = component[prop](event);
      }
    }
    if (event=== undefined){
      console.log("hmm")
    }
    else{
      console.log(event)
    let color;

    if (event.type in context.colour) {
      color = context.colour[event.type as keyof typeof context.colour];
    }
    if (!color) {
      console.dir(event.type);
    }

    const rect = new PIXI.Graphics()
    rect
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
    console.log(component)
    var buttonText = new PIXI.Text(component.text,
    {
        fontFamily : 'Arial',
        fontSize: 10,
        fill : "black",
    });
    buttonText.y = scale(event.y??component.y)
    buttonText.x = scale(event.x??component.x);
    rect.addChild(buttonText);
    g.addChild(rect)
  }}
}


export function D2Renderer({parsedComps, eventList}:D2RendererProps) {
  /**
   * TODO style the source and destination node
   */

  const drawInstructions = parsedComps["components"].map((ele:Component) => {
    return D2InstrinsicComponents[ele["$"]]["converter"](ele);
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