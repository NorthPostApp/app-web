import { Search } from "lucide-react";
import { selectedTagsAtom } from "@/atoms/addressAtoms";
import { useAtomValue } from "jotai";
import Button from "@/components/ui/Button";
import Popover from "@/components/ui/Popover";
import TagPopoverTrigger from "@/components/address-book/search/TagPopoverTrigger";
import TagPopoverContent from "@/components/address-book/search/TagPopoverContent";
import cn from "@/lib/cn";
import TagChip from "./TagChip";
import KeywordInput from "./KeywordInput";

export default function SearchTab() {
  const selectedTags = useAtomValue(selectedTagsAtom);
  return (
    <div className="w-full flex flex-col gap-2">
      {/* Text input */}
      <div className="w-full flex gap-3 items-center justify-between">
        <KeywordInput />
        <Button className="bg-(--accent-a9) hover:bg-(--accent-11) rounded-full h-7 w-7">
          <Search size={18} className="mx-auto my-auto stroke-(--color-background)" />
        </Button>
      </div>
      {/* Tag Chips */}
      <div
        className={cn(
          "w-full flex flex-col gap-2 bg-(--gray-3) rounded-2xl",
          selectedTags.length === 0 ? "p-0.5" : "p-2",
        )}
      >
        {selectedTags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {selectedTags.map((tag) => (
              <TagChip key={`selected-${tag}`} text={tag} active={false} />
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
