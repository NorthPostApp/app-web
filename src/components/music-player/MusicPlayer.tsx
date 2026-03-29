import { currentSongIndexAtom, musicListAtom } from "@/atoms/musicAtoms";
import { useEffect } from "react";
import { useAtom } from "jotai";
import { toast } from "sonner";
import { Pause, Play, SkipBack, SkipForward } from "lucide-react";
import { useGetMusicListQuery } from "@/hooks/queries/useGetMusicListQuery";
import { useMusicPlayer } from "@/hooks/useMusicPlayer";
import { useGetMusicURLQuery } from "@/hooks/queries/useGetMusicURLQuery";
import Button from "@/components/ui/Button";
import MusicSlider from "@/components/music-player/MusicSlider";
import "./MusicPlayer.css";

export default function MusicPlayer() {
  const [musicList, setMusicList] = useAtom(musicListAtom);
  const [currentSongIndex, setCurrentSongIndex] = useAtom(currentSongIndexAtom);
  const { refetch: fetchMusicList } = useGetMusicListQuery();

  const currentMusicItem =
    musicList && musicList.length > 0 ? musicList[currentSongIndex] : undefined;
  const { refetch: fetchMusicURL } = useGetMusicURLQuery(currentMusicItem?.filename);

  const numSongs = musicList ? musicList.length : 0;
  const playNextSong = () => {
    setCurrentSongIndex((prev) => (prev + 1) % numSongs);
  };
  const playPrevSong = () => {
    setCurrentSongIndex((prev) => (prev - 1 + numSongs) % numSongs);
  };

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
    <div className="music-player">
      <div className="music-player__state">
        <p>{currentMusicItem?.title}</p>
        <MusicSlider
          seek={seek}
          currentTime={currentTime}
          durationInSec={durationInSec}
        />
      </div>
      <div className="music-player__control">
        <Button
          className="music-player__control__side group"
          onClick={playPrevSong}
          data-testid="music-player__control__previous"
        >
          <SkipBack size={20} className="music-player__control__side__icon" />
        </Button>
        <Button
          className="music-player__control__main"
          onClick={playPauseMusic}
          data-testid="music-player__control__main"
        >
          {!isPlaying && <Play size={22} className="music-player__control__main__icon" />}
          {isPlaying && <Pause size={22} className="music-player__control__main__icon" />}
        </Button>
        <Button
          className="music-player__control__side group"
          onClick={playNextSong}
          data-testid="music-player__control__next"
        >
          <SkipForward size={20} className="music-player__control__side__icon" />
        </Button>
      </div>
    </div>
  );
}
