import { fireEvent, render, screen, waitFor } from "@/lib/test-utils";
import TextFormatControls from "./TextFormatControls";
import { SUPPORTED_TEXT_FORMATS } from "../editor-config";
import { FORMAT_TEXT_COMMAND } from "lexical";
import { Tooltip } from "@base-ui/react";
import { act } from "react";
import userEvent from "@testing-library/user-event";

const mockGetStatus = vi.fn();

const { mockEditor, mockDispatchCommand } = vi.hoisted(() => {
  const mockDispatchCommand = vi.fn();
  const mockEditor = { dispatchCommand: mockDispatchCommand };
  return { mockEditor, mockDispatchCommand };
});

vi.mock("@lexical/react/LexicalComposerContext", () => ({
  useLexicalComposerContext: () => [mockEditor],
}));

describe("TextFormatControls", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.unstubAllGlobals();
  });
  it("render all available formats", () => {
    render(<TextFormatControls getStatus={mockGetStatus} />);
    SUPPORTED_TEXT_FORMATS.forEach((format) => {
      expect(screen.getByTestId(`editor-toolbar-${format}`)).toBeTruthy();
    });
  });

  it("trigger format command when button clicked", () => {
    render(<TextFormatControls getStatus={mockGetStatus} />);
    const format = SUPPORTED_TEXT_FORMATS[0];
    const formatButton = screen.getByTestId(`editor-toolbar-${format}`);
    fireEvent.click(formatButton);
    expect(mockDispatchCommand).toHaveBeenCalledWith(FORMAT_TEXT_COMMAND, format);
  });

  it("uses ⌘ on Mac", async () => {
    vi.stubGlobal("navigator", { platform: "MacIntel" });
    const { default: TextFormatControls } = await import("./TextFormatControls");
    render(
      <Tooltip.Provider delay={10}>
        <TextFormatControls getStatus={mockGetStatus} />
      </Tooltip.Provider>,
    );
    act(() => {
      const boldButton = screen.getByTestId(`editor-toolbar-bold`);
      userEvent.hover(boldButton);
      waitFor(() => {
        expect(screen.getByText("⌘")).toBeTruthy();
      });
    });
  });

  it("uses Ctrl on Mac", async () => {
    vi.stubGlobal("navigator", { platform: "Win32" });
    const { default: TextFormatControls } = await import("./TextFormatControls");
    render(
      <Tooltip.Provider delay={10}>
        <TextFormatControls getStatus={mockGetStatus} />
      </Tooltip.Provider>,
    );
    act(() => {
      const boldButton = screen.getByTestId(`editor-toolbar-bold`);
      userEvent.hover(boldButton);
      waitFor(() => {
        expect(screen.getByText("Ctrl")).toBeTruthy();
      });
    });
  });
});
