import { createStore } from "jotai";
import { derivedSetTagsAtom, keywordsAtom, selectedTagsAtom } from "./addressAtoms";

describe("addressAtoms", () => {
  let store: ReturnType<typeof createStore>;
  beforeEach(() => {
    store = createStore();
  });

  it("keywords atom", () => {
    store.set(keywordsAtom, "hello");
    expect(store.get(keywordsAtom)).toBe("hello");
  });

  it("add/remove tag to tags atom", () => {
    store.set(selectedTagsAtom, ["tag1"]);
    store.set(derivedSetTagsAtom, "tag2");
    expect(store.get(selectedTagsAtom)).toEqual(["tag1", "tag2"]);
    store.set(derivedSetTagsAtom, "tag1");
    expect(store.get(selectedTagsAtom)).toEqual(["tag2"]);
  });
});
