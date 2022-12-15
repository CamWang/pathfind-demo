import { GeneralContext } from "./types";

export const Default2DRendererContext: GeneralContext = {
  current: null,
  parent: null,
  events: null,
  colour: {
    source: 0x26a69a,
    destination: 0xf06292,
    expanding: 0xff5722,
    generating: 0xffeb3b,
    closing: 0xb0bec5,
    end: 0xec407a,
  },
  scale: 15,
  fill: 0x000000,
  alpha: 1,
}