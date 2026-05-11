import { addressSearchResultsAtom } from "@/atoms/addressAtoms";
import { useAtomValue } from "jotai";
import AddressCard from "./AddressCard";
import type React from "react";

type SearchResultProps = {
  onScroll: (e: React.UIEvent<HTMLDivElement>) => void;
};

export default function SearchResult({ onScroll }: SearchResultProps) {
  const searchResult = useAtomValue(addressSearchResultsAtom);
  if (!searchResult || searchResult.totalCount === 0) {
    return (
      <div className="w-full text-center text-(--gray-8)">
        <p>No result available</p>
      </div>
    );
  }
  return (
    <div className="max-h-full overflow-auto" onScroll={onScroll}>
      <div className="grid grid-cols-2 gap-3 py-2">
        {searchResult.addresses.map((result) => (
          <AddressCard addressItem={result} key={result.id} />
        ))}
      </div>
    </div>
  );
}
