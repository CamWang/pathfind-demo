import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import StopIcon from '@mui/icons-material/Stop';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';

import {useContext} from "react";
import { PlaybackContext } from "../context/PlaybackContext";

export function Toolbar() {
  const playbackContext = useContext(PlaybackContext)
  if (playbackContext) {
    const {
      canPlay,
      play,
      pause,
      stop,
      stepForward,
      stepBackward,
    } = playbackContext;
    return (
      <>
        <Card
          variant="outlined"
          sx={{
            m: 3,
            px: 1.25,
            height: 56,
            display: "flex",
            float: "left",
            position: "absolute",
            alignItems: "center",
            pointerEvents: "all",
          }}
        >
          <Stack spacing={1.25} direction="row">
            {
              canPlay?
                <IconButton onClick={play}>
                  <PlayArrowIcon />
                </IconButton>
                :
                <IconButton onClick={pause}>
                  <PauseIcon />
                </IconButton>
            }
            <IconButton onClick={stop}>
              <StopIcon />
            </IconButton>
            <IconButton onClick={stepBackward}>
              <SkipPreviousIcon />
            </IconButton>
            <IconButton onClick={stepForward}>
              <SkipNextIcon/>
            </IconButton>
          </Stack>
        </Card>
      </>
    )
  } else {
    return <p>No playback context</p>
  }
}