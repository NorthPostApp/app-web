import { atom } from "jotai";

// Search
const keywordsAtom = atom<string>("");

const selectedTagsAtom = atom<string[]>([]);
const derivedSetTagsAtom = atom(null, (get, set, tag: string) => {
  const currTags = get(selectedTagsAtom);
  if (currTags.includes(tag)) {
    set(
      selectedTagsAtom,
      currTags.filter((currTag) => currTag !== tag),
    );
  } else {
    set(selectedTagsAtom, [...currTags, tag]);
  }
});

export { keywordsAtom, selectedTagsAtom, derivedSetTagsAtom };
