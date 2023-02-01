import { Event } from "../context/types";
import { Component } from "./types";

type HexColor = `#${string}` | `0x${string}` | number;

/**
 * Type definitions for components just for reference
 * Not enforced by the program during runtime
 */
export type Point = {
  x: number;
  y: number;
}

export type BezierPoint = {
  point: Point;
  control1?: Point;
  control2?: Point;
}

export type Generic2DIntrinsicComponent = Component & {
  fill?: HexColor;
  alpha?: number;
  text?: string;
}

export type LineIntrinsicComponent = Generic2DIntrinsicComponent & {
  $: "line";
  width: number;
  point1: Point;
  point2: Point;
}

export type RectIntrinsicComponent = Generic2DIntrinsicComponent & {
  $: "rect";
  width: number;
  height: number;
  point: Point;
}

export type CircleIntrinsicComponent = Generic2DIntrinsicComponent & {
  $: "circle";
  radius: number;
  point: Point;
}

export type PolygonIntrinsicComponent = Generic2DIntrinsicComponent & {
  $: "polygon";
  points: Point[];
}

/**
 * Event data types for development reference
 */

export type LineData = Event & {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export type RectData = Event & {
  x: number;
  y: number;
  width: number;
  height: number;
}

export type CircleData = Event & {
  x: number;
  y: number;
  radius: number;
}