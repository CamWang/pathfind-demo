import { D2Renderer } from "../renderer/D2Renderer/D2Renderer";
import trace from "../data/grid-astar.trace.json"
import trace2 from "../data/tile.trace.json"
import {parseViews} from "../renderer/Parser";

export function View() {
  return (
    <>
      <D2Renderer parsedComps={parseViews(trace.render).main} eventList={trace.eventList} />
    </>
  )
}