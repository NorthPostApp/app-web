import { useCallback, useEffect, useRef } from "react";
import { useAtomValue } from "jotai";
import clsx from "clsx";
import cn from "@/lib/cn";
import { selectedTagsAtom } from "@/atoms/addressAtoms";
import Popover from "@/components/ui/Popover";
import TagPopoverTrigger from "@/components/address-book/search/TagPopoverTrigger";
import TagPopoverContent from "@/components/address-book/search/TagPopoverContent";
import TagChip from "@/components/address-book/search/TagChip";
import KeywordInput from "@/components/address-book/search/KeywordInput";
import SearchTrigger from "@/components/address-book/search/SearchTrigger";
import SearchResults from "@/components/address-book/search/SearchResults";
import Pagination from "@/components/address-book/search/Pagination";

const styles = {
  outer: clsx("w-full h-full flex flex-col gap-3"),
  keywordSection: clsx("w-full flex gap-3 items-center justify-between"),
  tagsSection: clsx("w-full flex flex-col gap-2 bg-(--gray-3) rounded-2xl"),
  selectedTags: clsx("flex flex-wrap gap-1.5"),
  resultsContainer: clsx("flex-1 relative overflow-hidden"),
  scrollOverlay: clsx("absolute top-0 left-0 w-full h-full"),
};

export default function SearchTab() {
  const selectedTags = useAtomValue(selectedTagsAtom);
  const overlayRef = useRef<HTMLDivElement>(null);
  const scrollContainRef = useRef<HTMLDivElement>(null);

  const updateOverlay = useCallback(() => {
    const divElement = scrollContainRef.current;
    if (!overlayRef.current || !divElement) return;
    const isScrollable = divElement.scrollHeight > divElement.clientHeight;
    if (!isScrollable) {
      overlayRef.current.style.background = "none";
      return;
    }
    const percentage = Math.round(
      (divElement.scrollTop / (divElement.scrollHeight - divElement.clientHeight)) * 100,
    );
    if (percentage === 0) {
      overlayRef.current.style.background =
        "linear-gradient(transparent 0%, transparent 90%, var(--color-background) 100%)";
    } else if (percentage === 100) {
      overlayRef.current.style.background =
        "linear-gradient(var(--color-background) 0%, transparent 10%)";
    } else {
      overlayRef.current.style.background =
        "linear-gradient(var(--color-background) 0%, transparent 10%, transparent 90%, var(--color-background) 100%)";
    }
  }, []);

  useEffect(() => {
    const divElement = scrollContainRef.current;
    if (!divElement) return;
    const observer = new ResizeObserver(updateOverlay);
    observer.observe(divElement);
    updateOverlay();
    return () => observer.disconnect();
  }, [updateOverlay]);

  return (
    <div className={styles.outer}>
      {/* Text input */}
      <div className={styles.keywordSection}>
        <KeywordInput />
        <SearchTrigger />
      </div>
      {/* Tag Chips */}
      <div
        className={cn(styles.tagsSection, selectedTags.length === 0 ? "p-0.5" : "p-2")}
      >
        {selectedTags.length > 0 && (
          <div className={styles.selectedTags}>
            {selectedTags.map((tag) => (
              <TagChip key={`selected-${tag}`} text={tag} activeStyle={false} />
            ))}
          </div>
        )}
        <Popover trigger={<TagPopoverTrigger />} className="shadow-2xl">
          <TagPopoverContent />
        </Popover>
      </div>
      {/* Search results */}
      <div className={styles.resultsContainer}>
        <SearchResults ref={scrollContainRef} onScroll={updateOverlay} />
        <div ref={overlayRef} className={styles.scrollOverlay} inert />
      </div>
      {/* Pagination */}
      <Pagination />
    </div>
  );
}
