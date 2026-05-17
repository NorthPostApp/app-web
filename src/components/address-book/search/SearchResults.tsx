import clsx from "clsx";
import { useAtomValue } from "jotai";
import { useTranslation } from "react-i18next";
import { addressSearchResultsAtom } from "@/atoms/addressAtoms";
import AddressCard from "@/components/address-book/AddressCard";
import { useUpdateAddressBookMutation } from "@/hooks/mutations/useUpdateAddressBookMutation";

const styles = {
  container: clsx("max-h-full overflow-auto"),
  emptyState: clsx("w-full text-center text-(--gray-8)"),
  grid: clsx("grid grid-cols-2 gap-3 py-2"),
};

type SearchResultProps = {
  onScroll: () => void;
} & React.ComponentProps<"div">;

export default function SearchResults({ onScroll, ref }: SearchResultProps) {
  const { t } = useTranslation();
  const searchResult = useAtomValue(addressSearchResultsAtom);
  const showCards = searchResult && searchResult.totalCount !== 0;
  const { mutate, isPending } = useUpdateAddressBookMutation();
  return (
    <div
      ref={ref}
      className={styles.container}
      data-testid="scroll-container"
      onScroll={onScroll}
    >
      {!showCards && (
        <div className={styles.emptyState}>
          <p>{t("addressBook.search.noResult")}</p>
        </div>
      )}
      {showCards && (
        <div className={styles.grid}>
          {searchResult.addresses.map((result) => (
            <AddressCard
              addressItem={result}
              key={result.id}
              actionType="add"
              onClick={() => mutate({ ids: result.id, action: "add" })}
              loading={isPending}
            />
          ))}
        </div>
      )}
    </div>
  );
}
