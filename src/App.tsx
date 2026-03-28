// import "./App.css";
import { Toaster } from "sonner";
import Editor from "./components/editor/Editor";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MusicPlayer from "./components/music-player/MusicPlayer";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster
        closeButton
        toastOptions={{
          style: {
            color: "var(--text-color)",
            boxShadow: "var(--base-shadow)",
            borderRadius: "1rem",
          },
        }}
      />
      <div className="flex flex-col justify-center items-center gap-2">
        <Editor />
        <MusicPlayer />
      </div>
    </QueryClientProvider>
  );
}

export default App;
