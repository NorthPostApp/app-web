import { fireEvent, render, screen } from "@/lib/test-utils";
import ElementFormatControls from "./ElementFormatControls";
import { SUPPORTED_ELEMENT_FORMATS } from "../editor-config";
import { FORMAT_ELEMENT_COMMAND } from "lexical";

const mockGetStatus = vi.fn();
const mockDispatchCommand = vi.fn();
const mockEditor = { dispatchCommand: mockDispatchCommand };

vi.mock("@lexical/react/LexicalComposerContext", () => ({
  useLexicalComposerContext: () => [mockEditor],
}));

describe("ElementFormatControls", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  it("renders the format options", () => {
    render(<ElementFormatControls getStatus={mockGetStatus} />);
    SUPPORTED_ELEMENT_FORMATS.forEach((format) => {
      expect(screen.getByTestId(`editor-format-${format}`)).toBeTruthy();
    });
  });

  it("triggers format command", () => {
    mockGetStatus.mockReturnValue(false);
    render(<ElementFormatControls getStatus={mockGetStatus} />);
    const format = SUPPORTED_ELEMENT_FORMATS[0];
    const button = screen.getByTestId(`editor-format-${format}`);
    fireEvent.click(button);
    expect(mockDispatchCommand).toHaveBeenCalledWith(FORMAT_ELEMENT_COMMAND, format);
  });

  it("triggers clear format command", () => {
    mockGetStatus.mockReturnValue(true);
    render(<ElementFormatControls getStatus={mockGetStatus} />);
    const format = SUPPORTED_ELEMENT_FORMATS[0];
    const button = screen.getByTestId(`editor-format-${format}`);
    fireEvent.click(button);
    expect(mockDispatchCommand).toHaveBeenCalledWith(FORMAT_ELEMENT_COMMAND, "");
  });
});
