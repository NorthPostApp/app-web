import { fireEvent, render, screen } from "@/lib/test-utils";
import TextFormatControls from "./TextFormatControls";
import { SUPPORTED_TEXT_FORMATS } from "../editor-config";
import { FORMAT_TEXT_COMMAND } from "lexical";

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
});
