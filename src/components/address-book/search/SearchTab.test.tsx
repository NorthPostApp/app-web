import { createStore } from "jotai";
import { fireEvent, renderWithProviders, screen } from "@/lib/test-utils";
import { selectedTagsAtom } from "@/atoms/addressAtoms";
import SearchTab from "./SearchTab";

vi.mock("@/components/address-book/search/consts", async () => {
  const mod = await vi.importActual("@/components/address-book/search/consts");
  return {
    ...mod,
    MAX_NUM_TAGS: 4,
  };
});

vi.mock("@/components/address-book/search/TagPopoverContent", () => ({
  default: vi.fn(() => <div>tag content</div>),
}));

vi.mock("@/lib/firebase", () => ({ auth: { currentUser: null } }));

const makeStore = (selectedTags: string[] = []) => {
  const store = createStore();
  store.set(selectedTagsAtom, selectedTags);
  return store;
};

describe("SearchTab", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  it("renders the keyword input and popover trigger", () => {
    renderWithProviders(<SearchTab />, makeStore());
    expect(screen.getByPlaceholderText(/search by name or feature/i)).toBeTruthy();
    const popoverTrigger = screen.getByText(/\+ add tags/i);
    fireEvent.click(popoverTrigger);
    expect(screen.getByText(/tag content/)).toBeTruthy();
  });

  it("renders the tags and max tags reached contents on popover trigger", () => {
    renderWithProviders(<SearchTab />, makeStore(["Tag1", "Tag2", "Tag3", "Tag4"]));
    expect(screen.getByPlaceholderText(/search by name or feature/i)).toBeTruthy();
    expect(screen.getAllByText(/Tag/).length).toBe(4);
    expect(screen.getByText(/you can select up to/i)).toBeTruthy();
  });

  it("change keyword text", () => {
    renderWithProviders(<SearchTab />, makeStore());
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "keyword" } });
    expect(screen.getByDisplayValue("keyword")).toBeTruthy();
  });
});
