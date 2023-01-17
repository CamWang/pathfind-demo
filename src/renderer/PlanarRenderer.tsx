import { Graphics, Stage, useApp } from "@inlet/react-pixi";
import { Graphics as GraphicsType } from "@pixi/graphics";
import { useCallback, useEffect } from "react";
import { RenderProps, SearchTrace } from "./types";
import { LineData, RectData, CircleData, Generic2DIntrinsicComponent } from "./PlanarTypes";

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
      
    }
  }, [props.searchTrace]);

  return (
    <Stage options={{backgroundAlpha: 0}} >
      <Graphics draw={draw} />
    </Stage>
  )
}