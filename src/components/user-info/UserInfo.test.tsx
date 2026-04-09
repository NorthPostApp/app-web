import { createStore } from "jotai";
import { appConfigAtom } from "@/atoms/appConfigAtom";
import { userAtom } from "@/atoms/userAtoms";
import { fireEvent, renderWithProviders, screen, waitFor } from "@/lib/test-utils";
import UserInfo from "./UserInfo";
import userEvent from "@testing-library/user-event";
import { act } from "react";

vi.mock(import("@/components/user-info/UserSettingsPopover"), () => ({
  default: vi.fn(() => <button>user setting</button>),
}));

const makeStore = (language: "EN" | "ZH" = "EN") => {
  const store = createStore();
  store.set(appConfigAtom, { language, theme: "light" });
  store.set(userAtom, {
    displayName: "test user",
    email: "test@124.com",
    imageUrl: "http://imageurl.com",
    createdAt: new Date().getTime(),
    lastLogin: new Date().getTime(),
    drafts: [],
    likedMusics: [],
  });
  return store;
};

describe("UserInfo", () => {
  it("renders the component", () => {
    renderWithProviders(<UserInfo />, makeStore());
    expect(screen.getByRole("img")).toBeTruthy();
    expect(screen.queryAllByRole("button")).toHaveLength(4);
  });

  it("trigger theme selection", async () => {
    const user = userEvent.setup();
    renderWithProviders(<UserInfo />, makeStore());
    const themeButton = screen.getByTestId("user-info__button__theme");
    await act(() => user.hover(themeButton));
    await waitFor(() => {
      expect(screen.getByText("Light")).toBeTruthy();
    });
    fireEvent.click(themeButton);
    await act(() => user.hover(themeButton));
    await waitFor(() => {
      expect(screen.getByText("Dark")).toBeTruthy();
    });
    fireEvent.click(themeButton);
    await waitFor(() => {
      expect(screen.getByText("System")).toBeTruthy();
    });
  });
});
