import { createContext, useState, useMemo, useEffect, useCallback } from "react";
import traceJson from "../data/grid-astar.trace.json";
import {Event} from "./types";

type PlaybackProviderProps = {
  children?: React.ReactNode;
}

type PlaybackStateType = "playing" | "paused" | "stopped" | undefined;

type PlaybackContextType = {
  start: number;
  end: number;
  step: number;
  state: PlaybackStateType;
  trace: Event[];
  canPlay: boolean;
  canPause: boolean;
  canForward: boolean;
  canBackward: boolean;
  play: () => void;
  pause: () => void;
  stop: () => void;
  stepForward: () => void;
  stepBackward: () => void;
}

export const PlaybackContext = createContext<PlaybackContextType | null>(null);

export function PlaybackProvider(props: PlaybackProviderProps) {
  const [start, setStart] = useState(0);
  const [step, setStep] = useState(0);
  const [state, setState] = useState<PlaybackStateType>();
  const [end, setEnd] = useState(traceJson.eventList.length);

  const trace = useMemo(() => {
    const newMap = traceJson.eventList.slice(start, step);
    console.log("new trace: " + newMap.length);
    return newMap;
  }, [start, step]);
  
  const canPlay = useMemo(() => {
    return (!state || state==="paused") && step < end;
  }, [state, step, end]);
  const canPause = useMemo(() => {
    return !!state;
  }, [state]);
  const canForward = useMemo(() => {
    return !state && step < end;
  }, [state, step, end]);
  const canBackward = useMemo(() => {
    return !state && step > 0;
  }, [state, step]);
  
  const stepBy = useCallback((n: number) => 
    {if (step + n < end && step + n > start) {setStep(step + n)}}, 
    [start, end, step]
  );

  useEffect(() => {
    if (state === "playing") {
      if (step < end) {
        requestAnimationFrame(() => {
          setStep(step + 1);
        });
      } else if (step === end) {
        setState("paused");
        stepBy(1);
      }
    }
  }, [state, step, end, stepBy]);

  const context = {
    start,
    setStart,
    end,
    setEnd,
    step,
    setStep,
    state,
    setState,
    canPlay,
    canPause,
    canForward,
    canBackward,
    trace,
    play: () => {
      setState("playing");
      stepBy(1);
    },
    pause: () => {
      setState("paused");
      stepBy(1);
    },
    stop: () => {
      setState(undefined);
      setStep(0);
    },
    stepForward: () => {
      stepBy(1);
    },
    stepBackward: () => {
      stepBy(-1);
    }
  }

  return (
    <PlaybackContext.Provider value={context}>
      {props.children}
    </PlaybackContext.Provider>
  )
}

