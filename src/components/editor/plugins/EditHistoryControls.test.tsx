import { fireEvent, render, screen } from "@testing-library/react";
import EditHistoryControls from "./EditHistoryControls";
import { REDO_COMMAND, UNDO_COMMAND } from "lexical";

const mockGetStatus = vi.fn();
const mockDispatchCommand = vi.fn();
const mockEditor = { dispatchCommand: mockDispatchCommand };

vi.mock("@lexical/react/LexicalComposerContext", () => ({
  useLexicalComposerContext: () => [mockEditor],
}));

describe("EditHistoryControls", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders undo and redo buttons", () => {
    render(<EditHistoryControls getStatus={mockGetStatus} />);
    expect(screen.getByTestId("editor-toolbar-undo")).toBeTruthy();
    expect(screen.getByTestId("editor-toolbar-redo")).toBeTruthy();
  });

  it("renders undo command", () => {
    render(<EditHistoryControls getStatus={mockGetStatus} />);
    const undoButton = screen.getByTestId("editor-toolbar-undo");
    fireEvent.click(undoButton);
    expect(mockDispatchCommand).toHaveBeenCalledWith(UNDO_COMMAND, undefined);
    expect(mockGetStatus).toHaveBeenCalledTimes(2);
  });

  it("renders redo command", () => {
    render(<EditHistoryControls getStatus={mockGetStatus} />);
    const redoButton = screen.getByTestId("editor-toolbar-redo");
    fireEvent.click(redoButton);
    expect(mockDispatchCommand).toHaveBeenCalledWith(REDO_COMMAND, undefined);
    expect(mockGetStatus).toHaveBeenCalledTimes(2);
  });
});
