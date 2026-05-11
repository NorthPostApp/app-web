import { useEffect } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { toast } from "sonner";
import { LoaderCircle, Search } from "lucide-react";
import cn from "@/lib/cn";
import { appConfigAtom } from "@/atoms/appConfigAtom";
import {
  addressSearchResultsAtom,
  keywordsAtom,
  selectedTagsAtom,
} from "@/atoms/addressAtoms";
import { useGetAddressesQuery } from "@/hooks/queries/useGetAddressesQuery";
import Button from "@/components/ui/Button";

const styles = {
  searchIcon: "mx-auto my-auto stroke-(--color-background)",
};

export default function SearchTrigger() {
  const { language } = useAtomValue(appConfigAtom);
  const keywords = useAtomValue(keywordsAtom);
  const tags = useAtomValue(selectedTagsAtom);
  const setSearchResult = useSetAtom(addressSearchResultsAtom);
  const {
    refetch,
    data: searchResult,
    isFetching,
    isError,
    isStale,
    isPending,
  } = useGetAddressesQuery(language, 1, keywords, tags);
  if (!isFetching && !isError) {
    setSearchResult(searchResult);
  }
  // this effect ensures the error toast only pops out once after all retries
  useEffect(() => {
    if (isError) {
      toast.error("failed to get result");
    }
  }, [isError]);
  // this effect help update fetch data in the atom
  useEffect(() => {
    if (searchResult) {
      setSearchResult(searchResult);
    }
  }, [searchResult, setSearchResult]);

  return (
    <Button
      variant="solid"
      className="h-7 w-7"
      onClick={() => {
        if (isStale || isPending) refetch();
      }}
    >
      {!isFetching && (
        <Search
          data-testid="address-book-search-search"
          size={18}
          className={styles.searchIcon}
        />
      )}
      {isFetching && (
        <LoaderCircle
          data-testid="address-book-search-loading"
          size={16}
          className={cn(styles.searchIcon, "animate-spin")}
        />
      )}
    </Button>
  );
}
