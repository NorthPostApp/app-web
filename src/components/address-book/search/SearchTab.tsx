import { useAtomValue } from "jotai";
import cn from "@/lib/cn";
import { selectedTagsAtom } from "@/atoms/addressAtoms";
import Popover from "@/components/ui/Popover";
import TagPopoverTrigger from "@/components/address-book/search/TagPopoverTrigger";
import TagPopoverContent from "@/components/address-book/search/TagPopoverContent";
import TagChip from "@/components/address-book/search/TagChip";
import KeywordInput from "@/components/address-book/search/KeywordInput";
import SearchTrigger from "@/components/address-book/search/SearchTrigger";

const styles = {
  outer: "w-full flex flex-col gap-2",
  keywordSection: "w-full flex gap-3 items-center justify-between",
  tagsSection: "w-full flex flex-col gap-2 bg-(--gray-3) rounded-2xl",
  selectedTags: "flex flex-wrap gap-1.5",
};

export default function SearchTab() {
  const selectedTags = useAtomValue(selectedTagsAtom);
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
        <Popover trigger={<TagPopoverTrigger />}>
          <TagPopoverContent />
        </Popover>
      </div>
    </div>
  );
}
