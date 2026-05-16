import { useEffect } from "react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { toast } from "sonner";
import { LoaderCircle, Search } from "lucide-react";
import cn from "@/lib/cn";
import { appConfigAtom } from "@/atoms/appConfigAtom";
import {
  addressSearchResultsAtom,
  currPageAtom,
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
  const [currPage, setCurrPage] = useAtom(currPageAtom);
  const setSearchResult = useSetAtom(addressSearchResultsAtom);
  const {
    refetch,
    data: searchResult,
    isFetching,
    isError,
    isStale,
    isPending,
  } = useGetAddressesQuery(language, currPage + 1, keywords, tags);

  const refetchWithCache = () => {
    if (isStale || isPending) refetch();
  };

  // trigger fetching when page number or language changed
  // search condition changed, the page will be set back to 0
  // thus trigger refetch
  useEffect(() => {
    refetchWithCache();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currPage, language]);

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
        if (currPage !== 0) setCurrPage(0);
        // if the page is 0 and search condition changed
        // directly refetch with cache
        else refetchWithCache();
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
