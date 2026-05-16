import { createStore } from "jotai";
import { setUserAtom, userAtom } from "./userAtoms";
import type { UserDataSchema } from "@/schemas/user";

describe("userAtoms", () => {
  let store: ReturnType<typeof createStore>;
  beforeEach(() => {
    store = createStore();
  });

  it("defaults userAtom to null", () => {
    expect(store.get(userAtom)).toBeNull();
  });
  it("sets user data with setUserAtom", () => {
    const user: UserDataSchema = {
      displayName: "Test User",
      email: "test@example.com",
      imageUrl: "https://example.com/avatar.png",
      createdAt: 1,
      lastLogin: 2,
      drafts: [],
      likedMusics: [],
    };
    store.set(setUserAtom, user);
    expect(store.get(userAtom)).toEqual(user);
  });

  it("clears user data with setUserAtom", () => {
    store.set(setUserAtom, null);
    expect(store.get(userAtom)).toBeNull();
  });
});
