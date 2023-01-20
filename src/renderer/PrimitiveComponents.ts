import { Graphics as GraphicsType } from "@pixi/graphics";
import {  Component, Event } from "./types";
import {D2InstrinsicComponents} from "./D2Renderer"

export type DrawingInstruction = (g:GraphicsType, event:Event) => void;



export type InstrinsicComponents = {
  [key:string]: {"converter" : (comp:Component)=>DrawingInstruction,
                 "renderer": string}
}


export const primitiveComponents = {...D2InstrinsicComponents}