import { D2Renderer } from "../renderer/D2Renderer/D2Renderer";
// import trace from "../data/grid-astar.trace.json"
// import trace2 from "../data/tile.trace.json"
import trace from "../data/road-astar.trace.json"
import {parseViews} from "../renderer/Parser";

const parsedComps = parseViews(trace.render).main

export function View() {
  console.log(parsedComps)
  return (
    <div style={{height:"100%"}}>
      <D2Renderer parsedComps={parsedComps}/>
    </div>
  )
}