import { fireEvent, render, screen } from "@testing-library/react";
import MusicSlider from "./MusicSlider";

const mockSeek = vi.hoisted(() => {
  return vi.fn();
});

describe("MusicSlider", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  it("shows '--:--' for both times when undefined", () => {
    render(
      <MusicSlider seek={mockSeek} currentTime={undefined} durationInSec={undefined} />,
    );
    expect(screen.getAllByText("--:--")).toHaveLength(2);
  });

  it("shows '--:--' for current time when undefined", () => {
    render(<MusicSlider seek={mockSeek} currentTime={undefined} durationInSec={180} />);
    expect(screen.getByText("--:--")).toBeTruthy();
    expect(screen.getByText("03:00")).toBeTruthy();
  });

  it("shows '--:--' for duration when undefined", () => {
    render(<MusicSlider seek={mockSeek} currentTime={90} durationInSec={undefined} />);
    expect(screen.getByText("01:30")).toBeTruthy();
    expect(screen.getByText("--:--")).toBeTruthy();
  });

  it("displays formatted current time", () => {
    render(<MusicSlider seek={mockSeek} currentTime={90} durationInSec={180} />);
    expect(screen.getByText("01:30")).toBeTruthy();
  });

  it("call seek when changing the slider value", () => {
    render(<MusicSlider seek={mockSeek} currentTime={10} durationInSec={100} />);
    const slider = screen.getByRole("slider", { name: "music progress" });
    fireEvent.keyDown(slider, { key: "ArrowRight" });
    expect(mockSeek).toHaveBeenCalled();
  });
});
