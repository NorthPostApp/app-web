import { render } from "@/lib/test-utils";
import OnChangePlugin from "./OnChangePlugin";

const { mockCleanup, mockRead, mockRegisterUpdateListener, mockEditor } = vi.hoisted(
  () => {
    const mockCleanup = vi.fn();
    const mockRead = vi.fn((cb: () => void) => cb());
    const mockRegisterUpdateListener = vi.fn(() => mockCleanup);
    const mockEditor = { registerUpdateListener: mockRegisterUpdateListener };
    return { mockCleanup, mockRead, mockRegisterUpdateListener, mockEditor };
  },
);

vi.mock("@lexical/react/LexicalComposerContext", () => ({
  useLexicalComposerContext: () => [mockEditor],
}));

vi.mock("@lexical/markdown", () => ({
  $convertToMarkdownString: vi.fn(() => "**hello**"),
  TRANSFORMERS: [],
}));

describe("OnChangePlugin", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    mockRegisterUpdateListener.mockReturnValue(mockCleanup);
    mockRead.mockImplementation((cb: () => void) => cb());
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it("does not register an update listener when onChange is not provided", () => {
    render(<OnChangePlugin />);
    expect(mockRegisterUpdateListener).not.toHaveBeenCalled();
  });

  it("registers an update listener when onChange is provided", () => {
    render(<OnChangePlugin onChange={vi.fn()} />);
    expect(mockRegisterUpdateListener).toHaveBeenCalledOnce();
  });

  it("calls onChange with markdown after 500ms debounce", () => {
    const onChange = vi.fn();
    render(<OnChangePlugin onChange={onChange} />);
    const [listener] = mockRegisterUpdateListener.mock.calls[0] as unknown as [
      (arg: { editorState: { read: typeof mockRead } }) => void,
    ];
    listener({ editorState: { read: mockRead } });
    expect(onChange).not.toHaveBeenCalled();
    vi.advanceTimersByTime(500);
    expect(onChange).toHaveBeenCalledWith("**hello**");
  });

  it("unregisters the listener on unmount", () => {
    const { unmount } = render(<OnChangePlugin onChange={vi.fn()} />);
    unmount();
    expect(mockCleanup).toHaveBeenCalled();
  });
});
