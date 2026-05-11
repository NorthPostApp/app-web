import { fireEvent, renderWithProviders, screen, waitFor } from "@/lib/test-utils";
import SearchTrigger from "./SearchTrigger";
import { createStore } from "jotai";
import { useGetAddressesQuery } from "@/hooks/queries/useGetAddressesQuery";
import { addressSearchResultsAtom } from "@/atoms/addressAtoms";

const mockedRefetchFn = vi.fn();

vi.mock("@/hooks/queries/useGetAddressesQuery", () => ({
  useGetAddressesQuery: vi.fn(() => ({
    refetch: mockedRefetchFn,
    data: undefined,
    isFetching: false,
    isError: false,
    isStale: false,
    isPending: true,
  })),
}));

const mockToastErrorFn = vi.hoisted(() => vi.fn());
vi.mock("sonner", () => ({
  toast: { error: mockToastErrorFn },
}));

const mockData = {
  addresses: [
    {
      id: "addr-1",
      name: "Test Address",
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
  totalCount: 1,
  totalPages: 1,
  page: 1,
  language: "en",
};

describe("SearchTrigger", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  it("renders default elements", () => {
    renderWithProviders(<SearchTrigger />);
    expect(screen.getByTestId("address-book-search-search")).toBeTruthy();
    const triggerButton = screen.getByRole("button");
    fireEvent.click(triggerButton);
    expect(mockedRefetchFn).toHaveBeenCalled();
  });

  it("when error appears, calls toast.error", async () => {
    vi.mocked(useGetAddressesQuery).mockReturnValue({
      refetch: mockedRefetchFn,
      data: undefined,
      isFetching: false,
      isError: true,
      isStale: false,
      isPending: true,
    } as unknown as ReturnType<typeof useGetAddressesQuery>);
    renderWithProviders(<SearchTrigger />);
    expect(mockToastErrorFn).toHaveBeenCalled();
  });

  it("update data and blocks refetch fn", () => {
    vi.mocked(useGetAddressesQuery).mockReturnValue({
      refetch: mockedRefetchFn,
      data: mockData,
      isFetching: false,
      isError: false,
      isStale: false,
      isPending: false,
    } as unknown as ReturnType<typeof useGetAddressesQuery>);
    const store = createStore();
    renderWithProviders(<SearchTrigger />, store);
    const addressData = store.get(addressSearchResultsAtom);
    expect(addressData).toEqual(mockData);
    const triggerButton = screen.getByRole("button");
    fireEvent.click(triggerButton);
    expect(mockedRefetchFn).not.toHaveBeenCalled();
  });
});
