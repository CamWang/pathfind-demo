import { Graphics, Stage } from "@inlet/react-pixi";
import { Graphics as GraphicsType, } from "@pixi/graphics";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { Component, Event, View } from "../types";
import { DrawingInstruction } from "../PrimitiveComponents"
import { D2InstrinsicComponents } from "./D2Primitives";
import { PlaybackContext } from "../../context/PlaybackContext";


type D2RendererProps = {
  parsedComps: View;
}

const isToppedEventType = (type: string) => {
  switch(type) {
    case "source":
    case "destination":
    case "closing":
    case "end":
      return true;
  }
  return false;
}

export function D2Renderer({ parsedComps }: D2RendererProps) {
  /**
   * TODO style the source and destination node
   */
  const drawInstructions = parsedComps["components"].map((ele: Component) => {
    return D2InstrinsicComponents[ele["$"]]["converter"](ele);
  });

  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  const playbackContext = useContext(PlaybackContext);
  let trace:Event[] = useMemo(() => {
    if (playbackContext) {
      return playbackContext.trace;
    }
    return []
  }, [playbackContext]);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    });
  }, []);

  const draw = useCallback((g: GraphicsType) => {
    g.clear();
    if (trace.length !== 0) {
      const topEvents: Event[] = [];
      for (const event of trace) {
        drawInstructions.forEach((instr: DrawingInstruction) => {
          if (isToppedEventType(event.type)) {
            topEvents.push(event);
            return;
          }
          instr(g, event);
        });
      }
      for (const event of topEvents) {
        drawInstructions.forEach((instr: DrawingInstruction) => {
          instr(g, event);
        });
      }
    } else {
      console.log("STOPPED");
    }
  }, [trace, drawInstructions]);

  return (
    <Stage height={height} width={width} options={{ backgroundAlpha: 0 }} >
      <Graphics draw={draw} />
    </Stage>
  )
}
