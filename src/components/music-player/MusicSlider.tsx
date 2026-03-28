import { useState } from "react";
import { Slider } from "@base-ui/react/slider";
import { parseMusicDuration } from "./player-utils";

type MusicPlayerProps = {
  seek: (time: number) => void;
  currentTime: number | undefined;
  durationInSec: number | undefined;
};

export default function MusicSlider({
  seek,
  currentTime,
  durationInSec,
}: MusicPlayerProps) {
  const [seeking, setSeeking] = useState<boolean>(false);
  const [sliderTime, setSliderTime] = useState<number>(0);
  return (
    <div className="music-player__slider">
      <p>{parseMusicDuration(currentTime)}</p>
      <Slider.Root
        className="music-player__slider__root"
        max={durationInSec}
        min={0}
        value={seeking ? sliderTime : currentTime || 0}
        onValueChange={(value) => {
          if (!seeking) setSeeking(true);
          setSliderTime(value);
        }}
        onValueCommitted={(value) => {
          setSeeking(false);
          seek(value);
        }}
      >
        <Slider.Control className="group w-full">
          <Slider.Track className="music-player__slider__track">
            <Slider.Indicator className="music-player__slider__indicator" />
            <Slider.Thumb
              aria-label="music progress"
              className="music-player__slider__thumb"
            />
          </Slider.Track>
        </Slider.Control>
      </Slider.Root>
      <p>{parseMusicDuration(durationInSec)}</p>
    </div>
  );
}
