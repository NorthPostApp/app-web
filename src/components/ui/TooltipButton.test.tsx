import { render, screen, waitFor } from "@testing-library/react";
import { Tooltip } from "@base-ui/react";
import TooltipButton from "./TooltipButton";
import userEvent from "@testing-library/user-event";
import { act } from "react";

const renderTooltipButton = () => {
  render(
    <Tooltip.Provider delay={10}>
      <TooltipButton render={<button>show</button>} tooltip={<p>tooltip</p>} />
    </Tooltip.Provider>,
  );
};

describe("TooltipButton", () => {
  it("show tooltip", () => {
    renderTooltipButton();
    expect(screen.queryByText("tooltip")).toBeFalsy();
    act(() => {
      userEvent.hover(screen.getByText("show"));
      waitFor(() => {
        expect(screen.getByText("tooltip")).toBeTruthy();
      });
    });
  });
});
