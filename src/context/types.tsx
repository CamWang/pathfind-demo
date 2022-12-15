export type Event = {
  type: string;
  id: number;
  pid?: number;
  g?: number;
  h?: number;
  f?: number;
  [key: string]: any;
}

export type Colours = {
  source: number;
  destination: number;
  expanding: number;
  generating: number;
  closing: number;
  end: number;
}

export type GeneralContext = {
  current: Event | null;
  parent: Event | null;
  events: Event[] | null;
  colour: Colours;
  [key: string]: any;
}