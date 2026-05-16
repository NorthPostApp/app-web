import { fireEvent, renderWithProviders, screen } from "@/lib/test-utils";
import SearchResults from "./SearchResults";
import { createStore } from "jotai";
import { addressSearchResultsAtom } from "@/atoms/addressAtoms";
import type { GetAddressesResponse } from "@/apis/address";

const mockOnScroll = vi.fn();
const mockSearchResult: GetAddressesResponse = {
  addresses: [
    {
      id: "addr-1",
      name: "Test Address 1",
      briefIntro: "A brief intro",
      createdAt: 1700000000,
      updatedAt: 1700000000,
      tags: ["tag1"],
      address: {
        city: "Toronto",
        country: "Canada",
        line1: "123 Main St",
        line2: "",
        buildingName: "",
        postalCode: "M1A 1A1",
        region: "Ontario",
      },
    },
    {
      id: "addr-2",
      name: "Test Address 2",
      briefIntro: "A brief intro 2",
      createdAt: 1700000000,
      updatedAt: 1700000000,
      tags: ["tag1"],
      address: {
        city: "Kirkland",
        country: "USA",
        line1: "123 Main St",
        line2: "",
        buildingName: "",
        postalCode: "",
        region: "WA",
      },
    },
  ],
  totalCount: 2,
  totalPages: 1,
  page: 1,
  language: "en",
};

describe("SearchResults", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  it("without search result", () => {
    renderWithProviders(<SearchResults onScroll={mockOnScroll} />);
    expect(screen.getByText(/no result/i)).toBeTruthy();
  });

  it("with search result", () => {
    const store = createStore();
    store.set(addressSearchResultsAtom, mockSearchResult);
    renderWithProviders(<SearchResults onScroll={mockOnScroll} />, store);
    expect(screen.getByText(/test address 1/i)).toBeTruthy();
    expect(screen.getByText(/test address 2/i)).toBeTruthy();

    const scrollContainer = screen.getByTestId("scroll-container");
    expect(scrollContainer).toBeTruthy();
    fireEvent.scroll(scrollContainer);
    expect(mockOnScroll).toHaveBeenCalled();
  });
});
