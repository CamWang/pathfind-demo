import { Event } from "../context/types";

/**
 * General infos used by the renderers
 */

export type Component = {
  $: string;
  [key:string]: any;
}

export type Components = {
  [key:string]: Component[];
}

export type SearchTrace = {
  render: {
    components: Components;
    [key: string]: any;
  };
  eventList: Event[];
}

export type RenderProps = {
  searchTrace: SearchTrace;
}