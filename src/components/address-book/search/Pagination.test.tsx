import { fireEvent, renderWithProviders, screen } from "@/lib/test-utils";
import Pagination from "./Pagination";
import type { GetAddressesResponse } from "@/apis/address";
import { createStore } from "jotai";
import { addressSearchResultsAtom, currPageAtom } from "@/atoms/addressAtoms";
import type { AddressItemSchema } from "@/schemas/addresses";

const mockAddressItems: AddressItemSchema[] = [];

const mockSearchResult1: GetAddressesResponse = {
  addresses: mockAddressItems,
  totalPages: 10,
  page: 1,
  totalCount: 0,
  language: "en",
};

const mockSearchResult2: GetAddressesResponse = {
  addresses: mockAddressItems,
  totalPages: 2,
  page: 1,
  totalCount: 0,
  language: "en",
};

describe("Pagination", () => {
  it("render buttons", () => {
    const store = createStore();
    store.set(addressSearchResultsAtom, mockSearchResult1);
    renderWithProviders(<Pagination />, store);
    expect(screen.getAllByRole("button")).toHaveLength(mockSearchResult1.totalPages);
  });

  it("change page", () => {
    const store = createStore();
    store.set(addressSearchResultsAtom, mockSearchResult1);
    renderWithProviders(<Pagination />, store);
    const navigateButton = screen.getByRole("button", { name: "8" });
    fireEvent.click(navigateButton);
    expect(store.get(currPageAtom)).toBe(7); // 8 - 1
  });

  it("trigger update page side effect", () => {
    const store = createStore();
    store.set(currPageAtom, 9);
    store.set(addressSearchResultsAtom, mockSearchResult2);
    renderWithProviders(<Pagination />, store);
    expect(store.get(currPageAtom)).toBe(1);
  });
});
