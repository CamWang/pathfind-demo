import { Graphics, Stage, useApp } from "@inlet/react-pixi";
import { Graphics as GraphicsType } from "@pixi/graphics";
import { useCallback, useEffect } from "react";
import { RenderProps, SearchTrace } from "./types";
import { LineData, RectData, CircleData, Generic2DIntrinsicComponent } from "./PlanarTypes";
import { Default2DRendererContext as Context } from "../context/default";
import { Colours } from "../context/types";


// TODO component parse engine

const drawLine = (g:GraphicsType, data: LineData) => {

}

const getColorFromType = (type: keyof Colours): number => {
  if (type in Context.colour) {
    return Context.colour[type];
  } else {
    console.log(type);
    return Context.fill;
  }
}

const scale = (length: number): number => {
  return length * Context.scale;
}

const drawRect= (g:GraphicsType, data: any) => {
  g
    .beginFill(data.fill??getColorFromType(data.type), data.alpha??Context.alpha)
    .drawRect(
      scale(data.x), scale(data.y), scale(data.width??1), scale(data.height??1)
    )
    .endFill();
}

const drawCircle = (g:GraphicsType, data: CircleData) => {

}

const componentMap = {
  rect: drawRect,
  line: drawLine,
  circle: drawCircle,
}

const createDrawComponents = (g: GraphicsType, trace: SearchTrace) => {
  const components = [];
  for (const compName in trace.render.components) {
    
  }
}

export function PlanarRenderer(props: RenderProps) {
  // const app = useApp();
  // useEffect(() => {
  //   window.addEventListener("resize", () => {
  //     app.renderer.resize(window.innerWidth, window.innerHeight);
  //   });
  // }, [app.renderer]);

  const draw = useCallback((g: GraphicsType) => {
    const trace = props.searchTrace;
    for (const event of trace.eventList) {
      drawRect(g, event);
    }
  }, [props.searchTrace]);

  return (
    <Stage options={{backgroundAlpha: 0}} >
      <Graphics draw={draw} />
    </Stage>
  )
}