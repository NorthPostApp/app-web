import { createStore } from "jotai";
import { fireEvent, renderWithProviders, screen } from "@/lib/test-utils";
import { selectedTagsAtom } from "@/atoms/addressAtoms";
import TagChip from "./TagChip";

const makeStore = (selectedTags: string[] = []) => {
  const store = createStore();
  store.set(selectedTagsAtom, selectedTags);
  return store;
};

describe("TagChip", () => {
  it("renders with the given text", () => {
    renderWithProviders(<TagChip text="work" activeStyle={false} />, makeStore());
    expect(screen.getByText("work")).toBeTruthy();
  });

  it("toggles the tag on click", () => {
    const store = makeStore();
    renderWithProviders(<TagChip text="work" activeStyle={false} />, store);
    fireEvent.click(screen.getByText("work"));
    expect(store.get(selectedTagsAtom)).toEqual(["work"]);
  });

  it("does not toggle tag when disabled", () => {
    const store = makeStore();
    renderWithProviders(<TagChip text="work" activeStyle={false} disabled />, store);
    fireEvent.click(screen.getByText("work"));
    expect(store.get(selectedTagsAtom)).toEqual([]);
  });

  it("applies active styles when activeStyle is true", () => {
    renderWithProviders(<TagChip text="work" activeStyle={true} />, makeStore());
    const chip = screen.getByText("work");
    expect(chip.className).toContain("bg-(--accent-9)");
  });

  it("applies inactive styles when activeStyle is false", () => {
    renderWithProviders(<TagChip text="work" activeStyle={false} />, makeStore());
    const chip = screen.getByText("work");
    expect(chip.className).toContain("ring-(--gray-7)");
  });
});
