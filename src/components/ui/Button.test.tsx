import { render, screen } from "@/lib/test-utils";
import { describe, it, expect } from "vitest";
import Button from "./Button";

describe("Button", () => {
  it("renders button correctly", () => {
    render(<Button>Click</Button>);
    expect(screen.getByText(/click/i)).toBeTruthy();
  });

  it("renders button with inactive state", () => {
    render(<Button active={false}>Click</Button>);
    const button = screen.getByRole("button", { name: /click/i });
    expect(button.classList.contains("opacity-30"));
  });
});
