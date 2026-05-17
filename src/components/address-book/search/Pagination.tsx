import { useAtom, useAtomValue } from "jotai";
import { useEffect } from "react";
import clsx from "clsx";
import cn from "@/lib/cn";
import { addressSearchResultsAtom, currPageAtom } from "@/atoms/addressAtoms";
import Spinner from "@/components/ui/Spinner";
import Button from "@/components/ui/Button";

const styles = {
  body: clsx("w-full"),
  outer: clsx("relative mx-auto transform h-9 py-1 w-42 overflow-hidden"),
  inner: clsx("absolute top-0 left-0 flex"),
  buttonBase: clsx(
    "w-7 h-7 mx-1 border text-base rounded-xl p-0 shadow transition-colors duration-100 flex justify-center items-center",
  ),
  buttonActive: clsx("bg-(--accent-8) border-0 text-(--color-background) font-medium"),
  buttonInactive: clsx("border-(--gray-9) text-(--gray-10)"),
  overlay: clsx("absolute top-0 left-0 w-full h-full pointer-events-none"),
};

type PaginationProps = {
  isLoading?: boolean;
};

export default function Pagination({ isLoading }: PaginationProps) {
  const [currPage, setCurrPage] = useAtom(currPageAtom);
  const addressSearchResult = useAtomValue(addressSearchResultsAtom);
  const currShift = `${-currPage * 36 + 84 - 16}px`; // - (page * (button + 2 * margin) + half width - (button / 2 + margin))

  // sometimes when the search condition changed, switching page will trigger new call
  // new result could have smaller number of pages than the currPage value
  // therefore, if this happened, move to the new last page
  useEffect(() => {
    const totalPages = addressSearchResult?.totalPages;
    if (totalPages && currPage >= totalPages) {
      setCurrPage(totalPages - 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addressSearchResult?.totalPages]);

  const numPages = addressSearchResult?.totalPages || 0;
  const shouldRender = numPages !== 0 || addressSearchResult?.totalCount;
  if (!shouldRender) return <></>; // if no result, does not render pagination bar

  return (
    <div className={styles.body}>
      <div className={styles.outer}>
        <div
          className={styles.inner}
          style={{
            transform: `translate(${currShift}, 4px)`,
            transitionDuration: "200ms",
            transitionProperty: "transform",
          }}
        >
          {Array.from({ length: numPages }, (_, value) => value + 1).map(
            (value, index) => (
              <Button
                key={`pagination-${index}`}
                onClick={() => setCurrPage(index)}
                active={index === currPage}
                disabled={isLoading}
                className={cn(
                  styles.buttonBase,
                  index === currPage ? styles.buttonActive : styles.buttonInactive,
                )}
              >
                {isLoading && index === currPage ? <Spinner variant="sm" /> : value}
              </Button>
            ),
          )}
        </div>
        <div
          className={styles.overlay}
          style={{
            background:
              "linear-gradient(90deg, var(--color-background) 0%, transparent 20%, transparent 80%, var(--color-background) 100%)",
          }}
        ></div>
      </div>
    </div>
  );
}
