import { fireEvent, renderWithProviders, screen, waitFor } from "@/lib/test-utils";
import MusicPlayer from "./MusicPlayer";
import type { MusicListSchema } from "@/schemas/music";
import { createStore } from "jotai";
import { currentSongIndexAtom, musicListAtom } from "@/atoms/musicAtoms";
import { musicList } from "@/apis/__mocks__/musicHandlers";

const makeStore = (initialList?: MusicListSchema, initialIndex: number = 0) => {
  const store = createStore();
  store.set(musicListAtom, initialList);
  store.set(currentSongIndexAtom, initialIndex);
  return store;
};

// mocks for the useMusicPlayer hook
const mockPlay = vi.fn();
const mockPause = vi.fn();
const mockLoad = vi.fn();
const mockSeek = vi.fn();
const mockUseMusicPlayer = vi.fn();

vi.mock("@/hooks/useMusicPlayer", () => ({
  useMusicPlayer: () => mockUseMusicPlayer(),
}));

// mocks for music-related queries
const mockFetchMusicList = vi.fn();
vi.mock("@/hooks/queries/useGetMusicListQuery", () => ({
  useGetMusicListQuery: () => ({ refetch: mockFetchMusicList }),
}));
const mockFetchMusicURL = vi.fn();
vi.mock("@/hooks/queries/useGetMusicURLQuery", () => ({
  useGetMusicURLQuery: () => ({ refetch: mockFetchMusicURL }),
}));

// mock for sonner
const mockToastError = vi.hoisted(() => {
  return vi.fn();
});
vi.mock("sonner", () => ({
  toast: { error: mockToastError },
}));

describe("MusicPlayer", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseMusicPlayer.mockReturnValue({
      isPlaying: false,
      durationInSec: undefined,
      currentTime: undefined,
      load: mockLoad,
      play: mockPlay,
      pause: mockPause,
      seek: mockSeek,
    });
    mockFetchMusicList.mockResolvedValue({
      isSuccess: false,
      isError: false,
      data: undefined,
    });
    mockFetchMusicURL.mockResolvedValue({
      isSuccess: false,
      isError: false,
      data: undefined,
    });
  });

  it("renders 3 control buttons", () => {
    renderWithProviders(<MusicPlayer />);
    expect(screen.getAllByRole("button").length).toBe(3);
  });

  it("displays current song title", () => {
    renderWithProviders(<MusicPlayer />, makeStore(musicList, 0));
    expect(screen.getByText(musicList[0].title)).toBeTruthy();
  });

  it("fetched music list on mount", async () => {
    mockFetchMusicList.mockResolvedValue({
      isSuccess: true,
      isError: false,
      data: musicList,
    });
    renderWithProviders(<MusicPlayer />);
    await waitFor(() => {
      expect(mockFetchMusicList).toHaveBeenCalled();
    });
    expect(mockToastError).not.toHaveBeenCalled();
  });

  it("fetched music list on mount with failed request", async () => {
    mockFetchMusicList.mockResolvedValue({
      isSuccess: false,
      isError: true,
      data: undefined,
    });
    renderWithProviders(<MusicPlayer />);
    await waitFor(() => {
      expect(mockFetchMusicList).toHaveBeenCalled();
    });
    expect(mockToastError).toHaveBeenCalled();
  });

  it("fetch and load music url without playing", async () => {
    mockFetchMusicURL.mockResolvedValue({
      isSuccess: true,
      isError: false,
      data: "foo/bar.mp3",
    });
    renderWithProviders(<MusicPlayer />, makeStore(musicList, 0));
    await waitFor(() => {
      expect(mockFetchMusicURL).toHaveBeenCalled();
    });
    expect(mockLoad).toHaveBeenCalledWith("foo/bar.mp3");
    expect(mockPlay).not.toHaveBeenCalled();
  });

  it("fetch and load music url with playing", async () => {
    mockFetchMusicURL.mockResolvedValue({
      isSuccess: true,
      isError: false,
      data: "foo/bar.mp3",
    });
    mockUseMusicPlayer.mockReturnValue({
      isPlaying: true,
      durationInSec: undefined,
      currentTime: undefined,
      load: mockLoad,
      play: mockPlay,
      pause: mockPause,
      seek: mockSeek,
    });
    renderWithProviders(<MusicPlayer />, makeStore(musicList, 0));
    await waitFor(() => {
      expect(mockFetchMusicURL).toHaveBeenCalled();
    });
    expect(mockLoad).toHaveBeenCalledWith("foo/bar.mp3");
    expect(mockPlay).toHaveBeenCalled();
  });

  it("play music", () => {
    mockUseMusicPlayer.mockReturnValue({
      isPlaying: false,
      durationInSec: undefined,
      currentTime: undefined,
      load: mockLoad,
      play: mockPlay,
      pause: mockPause,
      seek: mockSeek,
    });
    renderWithProviders(<MusicPlayer />, makeStore(musicList, 0));
    const playButton = screen.getByTestId("music-player__control__main");
    fireEvent.click(playButton);
    expect(mockPlay).toHaveBeenCalled();
    expect(mockPause).not.toHaveBeenCalled();
  });

  it("pause music", () => {
    mockUseMusicPlayer.mockReturnValue({
      isPlaying: true,
      durationInSec: undefined,
      currentTime: undefined,
      load: mockLoad,
      play: mockPlay,
      pause: mockPause,
      seek: mockSeek,
    });
    renderWithProviders(<MusicPlayer />, makeStore(musicList, 0));
    const playButton = screen.getByTestId("music-player__control__main");
    fireEvent.click(playButton);
    expect(mockPlay).not.toHaveBeenCalled();
    expect(mockPause).toHaveBeenCalled();
  });

  it("play next song", async () => {
    mockUseMusicPlayer.mockReturnValue({
      isPlaying: true,
      durationInSec: undefined,
      currentTime: undefined,
      load: mockLoad,
      play: mockPlay,
      pause: mockPause,
      seek: mockSeek,
    });
    renderWithProviders(<MusicPlayer />, makeStore(musicList, 0));
    const nextButton = screen.getByTestId("music-player__control__next");
    fireEvent.click(nextButton);
    await waitFor(() => {
      expect(mockFetchMusicURL).toHaveBeenCalled();
    });
  });

  it("play previous song", async () => {
    mockUseMusicPlayer.mockReturnValue({
      isPlaying: true,
      durationInSec: undefined,
      currentTime: undefined,
      load: mockLoad,
      play: mockPlay,
      pause: mockPause,
      seek: mockSeek,
    });
    renderWithProviders(<MusicPlayer />, makeStore(musicList, 0));
    const prevButton = screen.getByTestId("music-player__control__previous");
    fireEvent.click(prevButton);
    await waitFor(() => {
      expect(mockFetchMusicURL).toHaveBeenCalled();
    });
  });
});
