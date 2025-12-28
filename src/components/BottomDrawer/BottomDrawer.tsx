import { useState, useEffect, useRef } from "react";
import { Box, IconButton } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PauseIcon from "@mui/icons-material/Pause";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import styles from "./BottomDrawer.module.css";
import { useAppStore } from "@/store/app.store";
import usePomodoroSound from "@/hooks/usePomodoroSound";

export const BottomDrawer = () => {
  const {
    bottomDrawerOpen,
    toggleBottomDrawer,
    currPomodoro: { isActive },
    toggleCurrPomodoro,
  } = useAppStore();
  const [minutes, setMinutes] = useState<number>(15);
  const [seconds, setSeconds] = useState<number>(0);
  const timerRef = useRef<NodeJS.Timeout>();
  const { playStartSound, playStopSound, stopSound } = usePomodoroSound();

  useEffect(() => {
    timerRef.current = setInterval(() => {
      if (isActive) {
        playStartSound();
        setSeconds((prevSeconds) => {
          if (prevSeconds > 0) {
            return prevSeconds - 1;
          } else {
            setMinutes((prevMinutes) => {
              if (prevMinutes > 0) {
                return prevMinutes - 1; // Decrement minutes
              }
              // Time up logic
              alert("Time is up! Take a break.");
              playStopSound();
              return prevMinutes; // Keep the last minute shown (0) when time is up
            });
            return 59; // Reset seconds to 59 as we decrease a minute
          }
        });
      }
    }, 1000);

    // Cleanup interval on component unmount
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      stopSound();
    };
  }, [isActive, playStartSound, playStopSound, stopSound]);

  const handlePauseResume = () => {
    toggleCurrPomodoro();
  };

  const restartTimer = () => {
    setMinutes(15);
    setSeconds(0);
    toggleCurrPomodoro(true);
  };

  const formatTime = (minutes: number, seconds: number): string => {
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  return (
    bottomDrawerOpen && (
      <Box className={styles.root}>
        <IconButton
          onClick={() => toggleBottomDrawer()}
          sx={{ alignSelf: "end" }}
          color="primary"
          size="small"
        >
          <ExpandMoreIcon />
        </IconButton>
        <div className={styles.timerCircle}>{formatTime(minutes, seconds)}</div>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <IconButton onClick={restartTimer} aria-label="restart">
            <RestartAltIcon fontSize="inherit" />
          </IconButton>
          <IconButton
            autoFocus
            onClick={handlePauseResume}
            aria-label="pause-resume"
          >
            {!isActive ? <PlayArrowIcon /> : <PauseIcon />}
          </IconButton>
        </Box>
      </Box>
    )
  );
};
