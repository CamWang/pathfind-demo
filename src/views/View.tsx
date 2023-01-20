import React from "react";
import { D2Renderer } from "../renderer/D2Renderer";
import trace from "../data/grid-astar.trace.json"
import trace2 from "../data/tile.trace.json"
import {parseViews} from "../renderer/Parser";

export function View() {
  return (
    <>
      <D2Renderer parsedComps={parseViews(trace2.render).main} eventList={trace2.eventList} />
    </>
  )
}