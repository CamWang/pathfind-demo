import { Graphics, Stage } from "@inlet/react-pixi";
import { Graphics as GraphicsType, } from "@pixi/graphics";
import { useCallback } from "react";
import { Component, Event, View } from "../types";
import { DrawingInstruction } from "../PrimitiveComponents"
import { D2InstrinsicComponents } from "./D2Primitives";

type D2RendererProps = {
  parsedComps: View,
  eventList: Event[]
}

export function D2Renderer({ parsedComps, eventList }: D2RendererProps) {
  /**
   * TODO style the source and destination node
   */
  console.log(parsedComps)
  const drawInstructions = parsedComps["components"].map((ele: Component) => {
    return D2InstrinsicComponents[ele["$"]]["converter"](ele);
  })


  const draw = useCallback((g: GraphicsType) => {
    for (const event of eventList) {
      console.log(event)
      drawInstructions.forEach((instr: DrawingInstruction) => instr(g, event))
    }
  }, [eventList, drawInstructions]);

  return (
    <Stage options={{ backgroundAlpha: 0 }} >
      <Graphics draw={draw} />
    </Stage>
  )
}
