import { render, screen } from "@testing-library/react";
import Spinner from "./Spinner";

describe("Spinner", () => {
  it("render with different sizes", () => {
    render(<Spinner variant="sm" />);
    expect(screen.getByTestId("ui-spinner-svg-14"));
    render(<Spinner variant="lg" />);
    expect(screen.getByTestId("ui-spinner-svg-24"));
    render(<Spinner />);
    expect(screen.getByTestId("ui-spinner-svg-20"));
  });
});
