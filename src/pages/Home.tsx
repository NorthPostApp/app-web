import Editor from "@/components/editor/Editor";
import MusicPlayer from "@/components/music-player/MusicPlayer";
import { signOut } from "@/apis/auth";
import AddressBook from "@/components/address-book/AddressBook";
import UserInfo from "@/components/user-info/UserInfo";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center gap-2">
      <Editor />
      <div className="flex w-full items-center justify-center gap-3">
        <UserInfo />
        <MusicPlayer />
      </div>
      <AddressBook />
      <button onClick={() => signOut()}>Sign Out</button>
    </div>
  );
}
