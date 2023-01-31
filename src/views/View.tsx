import { D2Renderer } from "../renderer/D2Renderer/D2Renderer";
import trace from "../data/grid-astar.trace.json"
import trace2 from "../data/tile.trace.json"
import {parseViews} from "../renderer/Parser";
import AutoSize from "react-virtualized-auto-sizer";

const parsedComps = parseViews(trace.render).main

export function View() {
  console.log(parsedComps)
  return (
    <>
      <AutoSize>
        {(size) => (
          <D2Renderer parsedComps={parsedComps} />
        )}
      </AutoSize>
    </>
  )
}