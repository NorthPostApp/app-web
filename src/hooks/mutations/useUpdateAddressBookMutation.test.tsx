import { act, renderHook } from "@testing-library/react";
import { useUpdateAddressBookMutation } from "./useUpdateAddressBookMutation";
import { createHookTestWrapper } from "@/lib/test-utils";

const { mockGetUserIdToken, mockUpdateAddressBook, mockToastSuccess, mockToastError } =
  vi.hoisted(() => ({
    mockGetUserIdToken: vi.fn(),
    mockUpdateAddressBook: vi.fn(),
    mockToastError: vi.fn(),
    mockToastSuccess: vi.fn(),
  }));

vi.mock("@/apis/auth", () => ({
  getUserIdToken: mockGetUserIdToken,
}));

vi.mock("@/apis/user", () => ({
  updateAddressBook: mockUpdateAddressBook,
}));

vi.mock("sonner", () => ({
  toast: {
    success: mockToastSuccess,
    error: mockToastError,
  },
}));

describe("useUpdateAddressBookMutation", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("update address and calls updateFn on success", async () => {
    const mockUpdateFn = vi.fn();
    mockGetUserIdToken.mockResolvedValue("123");
    mockUpdateAddressBook.mockResolvedValue("success");
    const { result } = renderHook(() => useUpdateAddressBookMutation(mockUpdateFn), {
      wrapper: createHookTestWrapper(),
    });
    await act(async () => {
      result.current.mutate({ ids: ["1", "2"], action: "add" });
    });
    expect(mockToastSuccess).toHaveBeenCalled();
    expect(mockUpdateFn).toHaveBeenCalledWith(["1", "2"]);
  });

  it("call with string", async () => {
    const mockUpdateFn = vi.fn();
    mockGetUserIdToken.mockResolvedValue(undefined);
    mockUpdateAddressBook.mockResolvedValue("success");
    const { result } = renderHook(() => useUpdateAddressBookMutation(mockUpdateFn), {
      wrapper: createHookTestWrapper(),
    });
    await act(async () => {
      result.current.mutate({ ids: "abc", action: "add" });
    });
    expect(mockToastSuccess).toHaveBeenCalled();
    expect(mockUpdateFn).toHaveBeenCalledWith(["abc"]);
  });

  it("no updateFn provided", async () => {
    mockGetUserIdToken.mockResolvedValue(undefined);
    mockUpdateAddressBook.mockResolvedValue("success");
    const { result } = renderHook(() => useUpdateAddressBookMutation(), {
      wrapper: createHookTestWrapper(),
    });
    await act(async () => {
      result.current.mutate({ ids: "abc", action: "add" });
    });
    expect(mockToastSuccess).toHaveBeenCalled();
  });

  it("call aborted by abort controller", async () => {
    const mockUpdateFn = vi.fn();
    const mockError = new Error("Aborted");
    mockError.name = "AbortError";
    mockUpdateAddressBook.mockRejectedValue(mockError);
    const { result } = renderHook(() => useUpdateAddressBookMutation(mockUpdateFn), {
      wrapper: createHookTestWrapper(),
    });
    await act(async () => {
      result.current.mutate({ ids: ["1", "2"], action: "add" });
    });
    expect(mockToastSuccess).not.toHaveBeenCalled();
    expect(mockToastError).not.toHaveBeenCalled();
  });

  it("call failed", async () => {
    const mockError = new Error("Failed");
    mockUpdateAddressBook.mockRejectedValue(mockError);
    const { result } = renderHook(() => useUpdateAddressBookMutation(), {
      wrapper: createHookTestWrapper(),
    });
    await act(async () => {
      result.current.mutate({ ids: ["1", "2"], action: "add" });
    });
    expect(mockToastSuccess).not.toHaveBeenCalled();
    expect(mockToastError).toHaveBeenCalled();
  });
});
