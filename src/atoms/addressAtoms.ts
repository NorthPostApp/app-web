import type { GetAddressesResponse } from "@/apis/address";
import { atom } from "jotai";

// Search
const keywordsAtom = atom<string>("");

const currPageAtom = atom<number>(0);

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

// Results
const addressSearchResultsAtom = atom<GetAddressesResponse | undefined>(undefined);

export {
  keywordsAtom,
  currPageAtom,
  selectedTagsAtom,
  derivedSetTagsAtom,
  addressSearchResultsAtom,
};
