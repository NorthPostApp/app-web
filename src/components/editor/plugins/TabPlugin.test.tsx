import {
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_LOW,
  KEY_TAB_COMMAND,
} from "lexical";
import { render } from "@testing-library/react";
import TabPlugin from "./TabPlugin";

const { mockCleanup, mockUpdate, mockRegisterCommand, mockEditor } = vi.hoisted(() => {
  const mockCleanup = vi.fn();
  const mockUpdate = vi.fn((cb: () => void) => cb());
  const mockRegisterCommand = vi.fn(() => mockCleanup);
  const mockEditor = { registerCommand: mockRegisterCommand, update: mockUpdate };
  return { mockCleanup, mockUpdate, mockRegisterCommand, mockEditor };
});
vi.mock("@lexical/react/LexicalComposerContext", () => ({
  useLexicalComposerContext: () => [mockEditor],
}));
vi.mock("lexical", () => ({
  $getSelection: vi.fn(),
  $isRangeSelection: vi.fn(),
  COMMAND_PRIORITY_LOW: 4,
  KEY_TAB_COMMAND: "keyTab",
}));

describe("TabPlugin", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    mockRegisterCommand.mockImplementation(() => mockCleanup);
    mockUpdate.mockImplementation((cb: () => void) => cb());
  });

  it("registers KEY_TAB_COMMAND with COMMAND_PRIORITY_LOW on mount", () => {
    render(<TabPlugin />);
    expect(mockRegisterCommand).toHaveBeenCalledWith(
      KEY_TAB_COMMAND,
      expect.any(Function),
      COMMAND_PRIORITY_LOW,
    );
  });

  it("calls preventDefault and inserts a tab character on tab key", () => {
    const mockInsertText = vi.fn();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    vi.mocked($getSelection).mockReturnValue({ insertText: mockInsertText } as any);
    vi.mocked($isRangeSelection).mockReturnValue(true);
    render(<TabPlugin />);
    const [, handler] = mockRegisterCommand.mock.calls[0] as unknown as [
      unknown,
      (e: KeyboardEvent) => boolean,
      number,
    ];
    const event = { preventDefault: vi.fn() } as unknown as KeyboardEvent;
    handler(event);
    expect(event.preventDefault).toHaveBeenCalled();
    expect(mockInsertText).toHaveBeenCalledWith("\t");
  });

  it("does not insert tab when selection is not a range selection", () => {
    const mockInsertText = vi.fn();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    vi.mocked($getSelection).mockReturnValue({ insertText: mockInsertText } as any);
    vi.mocked($isRangeSelection).mockReturnValue(false);
    render(<TabPlugin />);
    const [, handler] = mockRegisterCommand.mock.calls[0] as unknown as [
      unknown,
      (e: KeyboardEvent) => boolean,
      number,
    ];
    const event = { preventDefault: vi.fn() } as unknown as KeyboardEvent;
    handler(event);
    expect(mockInsertText).not.toHaveBeenCalled();
  });

  it("unregister the command on unmount", () => {
    const { unmount } = render(<TabPlugin />);
    unmount();
    expect(mockCleanup).toHaveBeenCalled();
  });
});
