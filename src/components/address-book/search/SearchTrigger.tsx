import { LoaderCircle, Search } from "lucide-react";
import cn from "@/lib/cn";
import Button from "@/components/ui/Button";

const styles = {
  searchIcon: "mx-auto my-auto stroke-(--color-background)",
};

type SearchTriggerProps = {
  isFetching: boolean;
  onClick: () => void;
};

export default function SearchTrigger({ isFetching, onClick }: SearchTriggerProps) {
  return (
    <Button variant="solid" className="h-7 w-7" onClick={onClick}>
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
