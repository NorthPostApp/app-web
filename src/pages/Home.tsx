import Editor from "@/components/editor/Editor";
import MusicPlayer from "@/components/music-player/MusicPlayer";
import { signOut } from "@/apis/auth";
import AddressBook from "@/components/address-book/AddressBook";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center gap-2">
      <Editor />
      <AddressBook />
      <MusicPlayer />
      <button onClick={() => signOut()}>Sign Out</button>
    </div>
  );
}
