import { appConfigAtom } from "@/atoms/appConfigAtom";
import { fireEvent, renderWithProviders, screen, waitFor } from "@/lib/test-utils";
import { createStore } from "jotai";
import UserSettingsPopover from "./UserSettingsPopover";
import userEvent from "@testing-library/user-event";

const makeStore = (language: "EN" | "ZH" = "EN") => {
  const store = createStore();
  store.set(appConfigAtom, { language, theme: "light" });
  return store;
};

const mockSignOut = vi.hoisted(() => vi.fn());
vi.mock("@/apis/auth", () => ({
  signOut: mockSignOut,
}));

describe("UserSettingsPopover", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the trigger icon button and show popover", () => {
    renderWithProviders(<UserSettingsPopover iconSize={20} />, makeStore("EN"));
    const iconButton = screen.getByRole("button");
    expect(screen.queryByText("Settings")).not.toBeTruthy();
    expect(iconButton).toBeTruthy();
    fireEvent.click(iconButton);
    expect(screen.getByText("Settings")).toBeTruthy();
  });

  it("switch language", async () => {
    const user = userEvent.setup();
    renderWithProviders(<UserSettingsPopover iconSize={20} />, makeStore("EN"));
    const iconButton = screen.getByRole("button");
    fireEvent.click(iconButton);
    const languageSelectButton = screen.getByText("English");
    fireEvent.click(languageSelectButton);
    await waitFor(() => {
      expect(screen.getByText("中文")).toBeTruthy();
    });
    const chineseOption = screen.getByText("中文");
    await user.click(chineseOption);
    await waitFor(() => {
      expect(chineseOption.parentElement).toHaveAttribute("aria-selected", "true");
    });
  });
});
