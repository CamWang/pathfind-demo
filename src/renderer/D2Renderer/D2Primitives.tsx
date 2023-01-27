import { Graphics as GraphicsType, } from "@pixi/graphics";
import { Component, Event } from "../types";
import { InstrinsicComponents } from "../PrimitiveComponents"
import * as PIXI from 'pixi.js';

// default context
const context = {
  current: null,
  parent: null,
  events: null,
  colour: {
    source: 0x26a69a,
    destination: 0xf06292,
    expanding: 0xff5722,
    updating: 0xff5722,
    generating: 0xffeb3b,
    closing: 0xb0bec5,
    end: 0xec407a,
  },
  scale: 15,
  fill: 0x000000,
  alpha: 1,
}

const scale = (length: number): number => {
  return length * context.scale;
}

export const D2InstrinsicComponents: InstrinsicComponents = {
  "rect": {
    "converter": (comp: Component) => rectDrawingCoverter(comp),
    "renderer": "2d-pixi",
  },
  "circle": {
    "converter": (comp: Component) => circleDrawingCoverter(comp),
    "renderer": "2d-pixi",
  },
  "polygon":{
    "converter": (comp: Component) => polygonDrawingCoverter(comp),
    "renderer": "2d-pixi",
  },
  "path":{
    "converter": (comp: Component) => pathDrawingCoverter(comp),
    "renderer": "2d-pixi",
  }
}


function polygonDrawingCoverter(component: Component) {

  return (g: GraphicsType, event: Event) => {}
}

function pathDrawingCoverter(component: Component) {

  return (g: GraphicsType, event: Event) => {}
}

function circleDrawingCoverter(component: Component) {

  return (g: GraphicsType, event: Event) => {
    for (const prop in component) {
      if (typeof component[prop] === "function") {
        component[prop] = component[prop](event);
      }
    }
    let color;

    if (event.type in context.colour) {
      color = context.colour[event.type as keyof typeof context.colour];
    }
    if (!color) {
      console.dir(event.type);
    }

    const circle = new PIXI.Graphics()
    circle
      .beginFill(
        event.fill ?? component.fill ?? color ?? 0xff5722,
        event.alpha ?? component.alpha ?? context.alpha)
      .drawCircle(
        scale(event.x ?? component.x),
        scale(event.y ?? component.y),
        scale(event.radius ?? component.radius ?? 1)
      )
      .endFill();

    const buttonText = new PIXI.Text(component.text,
      {
        fontFamily: 'Arial',
        fontSize: 10,
        fill: "black",
      });
    buttonText.y = scale(event.y ?? component.y)
    buttonText.x = scale(event.x ?? component.x);
    circle.addChild(buttonText);
    g.addChild(circle)
  }
}

function rectDrawingCoverter(component: Component) {

  return (g: GraphicsType, event: Event) => {

    for (const prop in component) {
      if (typeof component[prop] === "function") {
        console.log(prop)
        console.log(component[prop])
        console.log(component[prop](event))
        console.log(typeof component[prop])
        component[prop] = component[prop](event);
      }
    }

    let color;

    if (event.type in context.colour) {
      color = context.colour[event.type as keyof typeof context.colour];
    }
    if (!color) {
      console.dir(event.type);
    }

    const rect = new PIXI.Graphics()
    rect
      .beginFill(
        event.fill ?? component.fill ?? color ?? 0xff5722,
        event.alpha ?? component.alpha ?? context.alpha)
      .drawRect(
        scale(event.x ?? component.x),
        scale(event.y ?? component.y),
        scale(event.width ?? component.width ?? 1),
        scale(event.height ?? component.height ?? 1)
      )
      .endFill();

    const buttonText = new PIXI.Text(component.text,
      {
        fontFamily: 'Arial',
        fontSize: 10,
        fill: "black",
      });
    buttonText.y = scale(event.y ?? component.y)
    buttonText.x = scale(event.x ?? component.x);
    rect.addChild(buttonText);
    g.addChild(rect)
  }
}