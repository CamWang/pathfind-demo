import { createSlice, withLocalStorage } from "./createSlice";

export type Remote = {
  url: string;
  transport: string;
  key: string;
  disabled?: boolean;
};

type Settings = {
  remote?: Remote[];
  playbackRate?: number;
  acrylic?: boolean;
};

const DEV_PORT = 8001;

export const defaultRemotes = [
  {
    url: `internal://trace/`,
    transport: "native",
    key: "trace-provider",
  },
  {
    url: `http://localhost:${DEV_PORT}/`,
    transport: "socketio",
    key: "default-development-server",
  },
  {
    url: `https://warthog.spaaaacccee.io/`,
    transport: "socketio",
    key: "production-server",
  },
];

export const defaultPlaybackRate = 4;

export const [useSettings, SettingsProvider] = createSlice<Settings>(
  {
    remote: defaultRemotes,
    playbackRate: defaultPlaybackRate,
  },
  withLocalStorage("settings")
);
