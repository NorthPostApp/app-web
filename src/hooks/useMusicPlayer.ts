import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export function useMusicPlayer(playNextSong?: () => void, autoPlay: boolean = true) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number | undefined>(undefined);
  const [durationInSec, setDurationInSec] = useState<number | undefined>(undefined);

  const load = useCallback(
    (url: string) => {
      // cleans up the previous audio
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      // setup audio and controller
      const audio = new Audio(url);
      const abortController = new AbortController();
      audioRef.current = audio;
      abortControllerRef.current = abortController;
      setCurrentTime(0);

      // setup audio event listeners
      audio.addEventListener(
        "timeupdate",
        () => {
          if (audio.currentTime) setCurrentTime(audio.currentTime);
        },
        { signal: abortControllerRef.current.signal },
      );
      audio.addEventListener(
        "loadedmetadata",
        () => {
          if (audio.duration) {
            setDurationInSec(audio.duration);
          }
        },
        { signal: abortControllerRef.current.signal },
      );
      audio.addEventListener(
        "ended",
        () => {
          if (audio.ended) {
            if (autoPlay && playNextSong) {
              playNextSong();
            } else {
              setIsPlaying(false);
              setCurrentTime(0);
              // implement next song here.
              // maybe consider a different types of loops
              if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
              }
            }
          }
        },
        { signal: abortControllerRef.current.signal },
      );
    },
    [autoPlay, playNextSong],
  );

  const play = useCallback(() => {
    if (audioRef.current) {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() =>
          toast.error("failed to play music, please check if the music file is valid"),
        );
    }
  }, []);

  const pause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }, []);

  const seek = useCallback((time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      audioRef.current.play();
      setCurrentTime(time);
    }
  }, []);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return { isPlaying, durationInSec, currentTime, load, play, pause, seek };
}
