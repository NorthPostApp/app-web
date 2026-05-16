import { fireEvent, renderWithProviders, screen } from "@/lib/test-utils";
import SearchTrigger from "./SearchTrigger";

const mockOnClick = vi.fn();
describe("SearchTrigger", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  it("renders default elements", () => {
    renderWithProviders(<SearchTrigger isFetching={false} onClick={mockOnClick} />);
    expect(screen.getByTestId("address-book-search-search")).toBeTruthy();
    const triggerButton = screen.getByRole("button");
    fireEvent.click(triggerButton);
    expect(mockOnClick).toHaveBeenCalled();
  });

  it("show loading item", () => {
    renderWithProviders(<SearchTrigger isFetching={true} onClick={mockOnClick} />);
    expect(screen.getByTestId("address-book-search-loading")).toBeTruthy();
  });
});
