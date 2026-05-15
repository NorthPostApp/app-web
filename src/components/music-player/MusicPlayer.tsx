import { currentSongIndexAtom, musicListAtom } from "@/atoms/musicAtoms";
import { useCallback, useEffect } from "react";
import { useAtom } from "jotai";
import { toast } from "sonner";
import { Pause, Play, SkipBack, SkipForward } from "lucide-react";
import { useGetMusicListQuery } from "@/hooks/queries/useGetMusicListQuery";
import { useMusicPlayer } from "@/hooks/useMusicPlayer";
import { useGetMusicURLQuery } from "@/hooks/queries/useGetMusicURLQuery";
import Button from "@/components/ui/Button";
import MusicSlider from "@/components/music-player/MusicSlider";
import clsx from "clsx";

const styles = {
  body: clsx(
    "w-96 h-30 py-4 px-5 rounded-3xl shadow-(--base-shadow) flex flex-col justify-between items-center gap-2 bg-(--color-background)",
  ),
  state: clsx("w-full flex flex-col items-center text-sm"),
  control: clsx("flex items-center justify-center gap-2"),
  controlMainIcon: clsx("fill-(--color-background) stroke-0 mx-auto"),
  controlSideIcon: clsx(
    "fill-(--gray-8) stroke-(--gray-8) group-hover:fill-(--accent-9) group-hover:stroke-(--accent-9) mx-auto",
  ),
};

export default function MusicPlayer() {
  const [musicList, setMusicList] = useAtom(musicListAtom);
  const [currentSongIndex, setCurrentSongIndex] = useAtom(currentSongIndexAtom);
  const { refetch: fetchMusicList } = useGetMusicListQuery();

  const currentMusicItem =
    musicList && musicList.length > 0 ? musicList[currentSongIndex] : undefined;
  const { refetch: fetchMusicURL } = useGetMusicURLQuery(currentMusicItem?.filename);

  const numSongs = musicList ? musicList.length : 0;
  const playNextSong = useCallback(() => {
    setCurrentSongIndex((prev) => (prev + 1) % numSongs);
  }, [setCurrentSongIndex, numSongs]);
  const playPrevSong = useCallback(() => {
    setCurrentSongIndex((prev) => (prev - 1 + numSongs) % numSongs);
  }, [setCurrentSongIndex, numSongs]);

  const { durationInSec, isPlaying, load, play, pause, seek, currentTime } =
    useMusicPlayer(playNextSong);

  const playPauseMusic = () => {
    if (isPlaying) pause();
    else play();
  };

  // this effect controls on mount effect
  useEffect(() => {
    if (musicList === undefined) {
      fetchMusicList().then((response) => {
        if (response.isSuccess) {
          const musicList = response.data;
          setMusicList(musicList);
        } else if (response.isError) {
          toast.error("failed to load music list");
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // this effect controls
  useEffect(() => {
    if (currentMusicItem && currentMusicItem.filename) {
      fetchMusicURL().then((response) => {
        if (response.isSuccess && response.data) {
          load(response.data);
          if (isPlaying) play();
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentMusicItem, fetchMusicURL]);

  return (
    <div className={styles.body}>
      <div className={styles.state}>
        <p>{currentMusicItem?.title}</p>
        <MusicSlider
          seek={seek}
          currentTime={currentTime}
          durationInSec={durationInSec}
        />
      </div>
      <div className={styles.control}>
        <Button
          className="group"
          onClick={playPrevSong}
          data-testid="music-player__control__previous"
        >
          <SkipBack size={20} className={styles.controlSideIcon} />
        </Button>
        <Button
          variant="solid"
          onClick={playPauseMusic}
          data-testid="music-player__control__main"
        >
          {!isPlaying && <Play size={22} className={styles.controlMainIcon} />}
          {isPlaying && <Pause size={22} className={styles.controlMainIcon} />}
        </Button>
        <Button
          className="group"
          variant="light"
          onClick={playNextSong}
          data-testid="music-player__control__next"
        >
          <SkipForward size={20} className={styles.controlSideIcon} />
        </Button>
      </div>
    </div>
  );
}
