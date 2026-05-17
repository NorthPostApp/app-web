import { createHookTestWrapper, renderHook, waitFor } from "@/lib/test-utils";
import { useGetAddresses } from "./useGetAddresses";
import type { GetAddressesResponse } from "@/apis/address";
import { createStore } from "jotai";
import { currPageAtom } from "@/atoms/addressAtoms";
import { act } from "react";

const { mockUseGetAddressesQuery, mockToastError } = vi.hoisted(() => ({
  mockUseGetAddressesQuery: vi.fn(),
  mockToastError: vi.fn(),
}));

vi.mock("@/hooks/queries/useGetAddressesQuery", () => ({
  useGetAddressesQuery: mockUseGetAddressesQuery,
}));

vi.mock("sonner", () => ({
  toast: { error: mockToastError },
}));

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
  ],
  totalCount: 2,
  totalPages: 1,
  page: 1,
  language: "en",
};

describe("useGetAddresses", () => {
  it("initialize hook", () => {
    const mockRefetchFn = vi.fn();
    mockUseGetAddressesQuery.mockReturnValue({
      refetch: mockRefetchFn,
      data: mockSearchResult,
      isFetching: false,
      isError: false,
      isStale: false,
      isPending: true,
    });
    const { result } = renderHook(() => useGetAddresses(), {
      wrapper: createHookTestWrapper(),
    });
    expect(mockRefetchFn).toHaveBeenCalled();
    expect(result.current.isFetching).toBe(false);
  });

  it("call toast on error", () => {
    const mockRefetchFn = vi.fn();
    mockUseGetAddressesQuery.mockReturnValue({
      refetch: mockRefetchFn,
      data: mockSearchResult,
      isFetching: false,
      isError: true,
      isStale: false,
      isPending: false,
    });
    renderHook(() => useGetAddresses(), {
      wrapper: createHookTestWrapper(),
    });
    expect(mockRefetchFn).not.toHaveBeenCalled();
  });

  it("trigger search with page larger than 1", async () => {
    const mockRefetchFn = vi.fn();
    mockUseGetAddressesQuery.mockReturnValue({
      refetch: mockRefetchFn,
      data: mockSearchResult,
      isFetching: false,
      isError: false,
      isStale: true,
      isPending: false,
    });
    const store = createStore();
    const { result } = renderHook(() => useGetAddresses(), {
      wrapper: createHookTestWrapper(store),
    });
    act(() => {
      store.set(currPageAtom, 4);
      result.current.triggerSearch();
    });
    waitFor(() => expect(store.get(currPageAtom)).toBe(0));
  });

  it("trigger search with page is 1", async () => {
    const mockRefetchFn = vi.fn();
    mockUseGetAddressesQuery.mockReturnValue({
      refetch: mockRefetchFn,
      data: mockSearchResult,
      isFetching: false,
      isError: false,
      isStale: true,
      isPending: false,
    });
    const store = createStore();
    store.set(currPageAtom, 0);
    const { result } = renderHook(() => useGetAddresses(), {
      wrapper: createHookTestWrapper(store),
    });
    act(() => {
      result.current.triggerSearch();
    });
    waitFor(() => expect(mockRefetchFn).toHaveBeenCalledTimes(2));
  });
});
