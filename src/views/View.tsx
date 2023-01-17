import React from "react";
import { PlanarRenderer } from "../renderer/PlanarRenderer";
import trace from "../data/grid-astar.trace.json"

export function View() {
  return (
    <>
      <PlanarRenderer searchTrace={trace} />
    </>
  )
}