import { Event } from "../context/types";
import componentMap from "./IntrinsicComponents";

/**
 * General infos used by the renderers
 */

export type Component = {
  $: keyof typeof componentMap;
  [key:string]: any;
}

export type Components = {
  [key:string]: Component[];
}

export type SearchTrace = {
  context?: object | null;
  render: {
    components: Components;
    [key: string]: any;
  };
  eventList: Event[];
}

export type RenderProps = {
  searchTrace: SearchTrace;
}