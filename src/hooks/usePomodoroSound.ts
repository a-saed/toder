import { useCallback, useRef } from "react";
import StartTimerSound from "@/assets/start-timer.mp3";
import StopTimerSound from "@/assets/stop-timer.mp3";

function usePomodoroSound() {
  const audioRef = useRef<HTMLAudioElement>(new Audio());
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const playSound = useCallback((sound: string) => {
    clearTimeout(timeoutRef.current!); // Always clear any existing timeout first
    if (audioRef.current) {
      audioRef.current.src = sound;
      audioRef.current.play().catch((err) => {
        console.error("Failed to play sound:", err);
      });
      timeoutRef.current = setTimeout(() => {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }, 3000);
    }
  }, []);

  const playStartSound = useCallback(
    () => playSound(StartTimerSound),
    [playSound]
  );
  const playStopSound = useCallback(
    () => playSound(StopTimerSound),
    [playSound]
  );

  const stopSound = useCallback(() => {
    clearTimeout(timeoutRef.current!);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, []);

  return { playStartSound, playStopSound, stopSound };
}

export default usePomodoroSound;
