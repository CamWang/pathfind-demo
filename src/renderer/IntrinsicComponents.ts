import { LineData, RectData, CircleData, Generic2DIntrinsicComponent } from "./PlanarTypes";
import { Graphics as GraphicsType } from "@pixi/graphics";
import { Colours } from "../context/types";
import { Default2DRendererContext as Context } from "../context/default";

const scale = (length: number): number => {
  return length * Context.scale;
}

const getColorFromType = (type: keyof Colours): number => {
  if (type in Context.colour) {
    return Context.colour[type];
  } else {
    console.log(type);
    return Context.fill;
  }
}

/**
 * 
 * @param {GraphicsType}    g - 
 * @param {Object}          data - data required for pixi to draw an rectangle
 * @param {string | number} data.fill - fill color, if not provided will deduce 
 *                                      from state of current node
 * @param {number}          data.alpha - transparency, default to Context.alpha
 * @param {number}          data.x - x coordinate of top left cornor position
 * @param {number}          data.y - y coordinate of top left cornor position
 * @param {number}          data.width - width, default to 1
 * @param {number}          data.height - height, default to 1
 */
const drawRect = (g:GraphicsType, data: any) => {
  g
    .beginFill(data.fill??getColorFromType(data.type), data.alpha??Context.alpha)
    .drawRect(
      scale(data.x), scale(data.y), scale(data.width??1), scale(data.height??1)
    )
    .endFill();
}

const drawCircle = (g:GraphicsType, data: CircleData) => {

}

const drawLine = (g:GraphicsType, data: LineData) => {

}

const componentMap = {
  rect: drawRect,
  line: drawLine,
  circle: drawCircle,
}

export default componentMap;