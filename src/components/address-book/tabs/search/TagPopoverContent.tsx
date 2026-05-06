import { appConfigAtom } from "@/atoms/appConfigAtom";
import { useGetAllTagsQuery } from "@/hooks/queries/useGetAllTagsQuery";
import { useAtomValue } from "jotai";
import TagChip from "./TagChip";
import { selectedTagsAtom } from "@/atoms/addressAtoms";

export default function TagPopoverContent() {
  const { language } = useAtomValue(appConfigAtom);
  const { data: tagsRecord } = useGetAllTagsQuery(language);
  const selectedTags = useAtomValue(selectedTagsAtom);

  return (
    <div className="max-w-100 flex flex-col">
      {tagsRecord &&
        Object.entries(tagsRecord?.tags).map(([category, tags]) => (
          <div
            key={category}
            className="border-b border-dashed border-(--gray-7) py-3 last:border-none first:pt-0"
          >
            <h3 className="mb-2">{category}</h3>
            <div className="flex gap-2.5 flex-wrap">
              {tags.map((tag) => (
                <TagChip
                  key={`${category}-${tag}`}
                  text={tag}
                  active={selectedTags.includes(tag)}
                />
              ))}
            </div>
          </div>
        ))}
    </div>
  );
}
