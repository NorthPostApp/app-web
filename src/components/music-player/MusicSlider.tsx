import { useState } from "react";
import { Slider } from "@base-ui/react/slider";
import { parseMusicDuration } from "./player-utils";
import clsx from "clsx";

const styles = {
  slider: clsx("w-full flex gap-2 justify-center items-center"),
  sliderRoot: clsx("flex-1"),
  sliderTrack: clsx(
    "w-full h-1 bg-(--gray-6) group-hover:bg-(--accent-7) group-hover:cursor-pointer rounded-full",
  ),
  sliderIndicator: clsx(
    "bg-(--gray-9) group-hover:bg-(--accent-9) rounded-full select-none",
  ),
  sliderThumb: clsx(
    "invisible group-hover:visible w-3.5 h-3.5 select-none bg-(--accent-8) outline-0 rounded-full",
  ),
  sliderTime: clsx("w-10"),
};

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
    <div className={styles.slider}>
      <p className={styles.sliderTime}>{parseMusicDuration(currentTime)}</p>
      <Slider.Root
        className={styles.sliderRoot}
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
          <Slider.Track className={styles.sliderTrack}>
            <Slider.Indicator className={styles.sliderIndicator} />
            <Slider.Thumb aria-label="music progress" className={styles.sliderThumb} />
          </Slider.Track>
        </Slider.Control>
      </Slider.Root>
      <p className={styles.sliderTime}>{parseMusicDuration(durationInSec)}</p>
    </div>
  );
}
