// import "./App.css";
import Editor from "./components/editor/Editor";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MusicPlayer from "./components/music-player/MusicPlayer";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex justify-center gap-2">
        <MusicPlayer />
        <Editor />
      </div>
    </QueryClientProvider>
  );
}

export default App;
