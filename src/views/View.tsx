import { D2Renderer } from "../renderer/D2Renderer/D2Renderer";
import trace from "../data/grid-astar.trace.json"
import {parseViews} from "../renderer/Parser";

const parsedComps = parseViews(trace.render).main

export function View() {

  return (
    <>
      <D2Renderer parsedComps={parsedComps} />
    </>
  )
}