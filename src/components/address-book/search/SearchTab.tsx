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
import SearchResult from "./SearchResults";
import { useRef } from "react";

const styles = {
  outer: clsx("w-full h-full flex flex-col gap-3"),
  keywordSection: clsx("w-full flex gap-3 items-center justify-between"),
  tagsSection: clsx("w-full flex flex-col gap-2 bg-(--gray-3) rounded-2xl"),
  selectedTags: clsx("flex flex-wrap gap-1.5"),
};

export default function SearchTab() {
  const selectedTags = useAtomValue(selectedTagsAtom);
  const overlayRef = useRef<HTMLDivElement>(null);

  const onScroll = (e: React.UIEvent) => {
    const div = e.currentTarget;
    if (!overlayRef.current || div.scrollHeight === div.clientHeight) return; // avoid 0 division and disable gradient
    const percentage = Math.round(
      (div.scrollTop / (div.scrollHeight - div.clientHeight)) * 100,
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
  };

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
      <div className="flex-1 relative overflow-hidden">
        <SearchResult onScroll={onScroll} />
        <div ref={overlayRef} className="absolute top-0 left-0 w-full h-full" inert />
      </div>
    </div>
  );
}
