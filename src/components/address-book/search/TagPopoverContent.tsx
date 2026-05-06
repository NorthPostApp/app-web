import { useMemo } from "react";
import { appConfigAtom } from "@/atoms/appConfigAtom";
import { useGetAllTagsQuery } from "@/hooks/queries/useGetAllTagsQuery";
import { useAtomValue } from "jotai";
import TagChip from "./TagChip";
import { selectedTagsAtom } from "@/atoms/addressAtoms";
import { useTranslation } from "react-i18next";
import { MAX_NUM_TAGS } from "./consts";

export default function TagPopoverContent() {
  const { t } = useTranslation();
  const { language } = useAtomValue(appConfigAtom);
  const { data: tagsRecord } = useGetAllTagsQuery(language);
  const selectedTags = useAtomValue(selectedTagsAtom);
  const selectedTagsSet = useMemo(() => new Set(selectedTags), [selectedTags]);

  return (
    <div className="max-w-100 flex flex-col">
      {tagsRecord &&
        Object.entries(tagsRecord?.tags).map(([category, tags]) => (
          <div key={category} className="py-3 first:pt-0 last:pb-2">
            <h3 className="pb-1 mb-3 border-b border-dashed border-(--gray-7) text-sm font-medium">
              {t(`addressBook.tags.${category}`)}
            </h3>
            <div className="flex gap-2 flex-wrap">
              {tags.map((tag) => (
                <TagChip
                  key={`${category}-${tag}`}
                  text={tag}
                  active={selectedTagsSet.has(tag)}
                  disabled={
                    !selectedTagsSet.has(tag) && selectedTags.length >= MAX_NUM_TAGS
                  }
                />
              ))}
            </div>
          </div>
        ))}
    </div>
  );
}
