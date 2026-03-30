import Editor from "@/components/editor/Editor";
import MusicPlayer from "@/components/music-player/MusicPlayer";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center gap-2">
      <Editor />
      <MusicPlayer />
    </div>
  );
}
