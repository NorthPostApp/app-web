import { describe, it, expect, vi, beforeEach } from "vitest";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { toast } from "sonner";
import { BASE_URL } from "./shared";
import {
  handleAuthenticationError,
  authenticateUser,
  signInWithGoogle,
  signInWithGithub,
  signOut,
  getUserIdToken,
} from "./auth";

vi.mock("sonner", () => ({ toast: { error: vi.fn() } }));

vi.mock("@/lib/firebase", () => ({
  auth: {
    currentUser: {
      getIdToken: vi.fn().mockResolvedValue("mockIdToken"),
    },
  },
}));

const { mockSignInWithPopup, mockSignOut } = vi.hoisted(() => ({
  mockSignInWithPopup: vi.fn(),
  mockSignOut: vi.fn(),
}));
vi.mock("firebase/auth", () => ({
  GoogleAuthProvider: vi.fn(),
  GithubAuthProvider: vi.fn(),
  signInWithPopup: mockSignInWithPopup,
  signOut: mockSignOut,
}));

const mockUserData = {
  displayName: "Test User",
  email: "test@example.com",
  imageUrl: "https://example.com/avatar.png",
  createdAt: 1000000,
  lastLogin: 2000000,
  drafts: [],
  likedMusics: [],
};

const server = setupServer();
beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("handleAuthenticationError", () => {
  beforeEach(() => vi.mocked(toast.error).mockClear());

  it("calls toast.error with the Error message", () => {
    handleAuthenticationError(new Error("network failure"));
    expect(toast.error).toHaveBeenCalledWith("network failure");
  });

  it("calls toast.error with a plain string error", () => {
    handleAuthenticationError("something went wrong");
    expect(toast.error).toHaveBeenCalledWith("something went wrong");
  });

  it("calls toast.error with default message for unknown error types", () => {
    handleAuthenticationError(null);
    expect(toast.error).toHaveBeenCalledWith(
      "failed to signin. Please check the internet.",
    );
  });
});

describe("authenticateUser", () => {
  it("success", async () => {
    server.use(
      http.post(`${BASE_URL}signin`, () => {
        return HttpResponse.json({ data: mockUserData });
      }),
    );
    const result = await authenticateUser("valid-token");
    expect(result).toMatchObject({ displayName: "Test User", email: "test@example.com" });
  });

  it("failed with returned message", async () => {
    server.use(
      http.post(`${BASE_URL}signin`, () => {
        return HttpResponse.json({ error: "unauthorized" }, { status: 401 });
      }),
    );
    await expect(authenticateUser("bad-token")).rejects.toThrow("unauthorized");
  });

  it("failed with default message", async () => {
    server.use(
      http.post(`${BASE_URL}signin`, () => {
        return HttpResponse.json({}, { status: 401 });
      }),
    );
    await expect(authenticateUser("bad-token")).rejects.toThrow(
      "failed to authenticate user",
    );
  });
});

describe("utility functions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("signInWithGoogle", () => {
    signInWithGoogle();
    expect(mockSignInWithPopup).toHaveBeenCalled();
  });

  it("signInWithGithub", () => {
    signInWithGithub();
    expect(mockSignInWithPopup).toHaveBeenCalled();
  });

  it("signout", () => {
    signOut();
    expect(mockSignOut).toHaveBeenCalled();
  });

  it("getUserIdToken", async () => {
    await expect(getUserIdToken()).resolves.toBe("mockIdToken");
  });
});
