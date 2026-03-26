import { render, screen } from "@testing-library/react";
import Kbd from "./Kbd";

describe("Kbd", () => {
  it("show text", () => {
    render(<Kbd>Hi</Kbd>);
    expect(screen.getByText("Hi")).toBeTruthy();
  });
});
