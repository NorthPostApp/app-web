import { Search } from "lucide-react";
import { selectedTagsAtom } from "@/atoms/addressAtoms";
import { useAtomValue } from "jotai";
import Button from "@/components/ui/Button";
import cn from "@/lib/cn";
import Popover from "@/components/ui/Popover";
import TagPopoverTrigger from "@/components/address-book/search/TagPopoverTrigger";
import TagPopoverContent from "@/components/address-book/search/TagPopoverContent";
import TagChip from "@/components/address-book/search/TagChip";
import KeywordInput from "@/components/address-book/search/KeywordInput";

const styles = {
  outer: "w-full flex flex-col gap-2",
  searchIcon: "mx-auto my-auto stroke-(--color-background)",
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
        <Button variant="solid" className="h-7 w-7">
          <Search size={18} className={styles.searchIcon} />
        </Button>
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
