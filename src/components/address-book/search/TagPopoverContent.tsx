import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import { useAtomValue } from "jotai";
import { LoaderCircle } from "lucide-react";
import { appConfigAtom } from "@/atoms/appConfigAtom";
import { selectedTagsAtom } from "@/atoms/addressAtoms";
import { useGetAllTagsQuery } from "@/hooks/queries/useGetAllTagsQuery";
import { MAX_NUM_TAGS } from "@/components/address-book/search/consts";
import TagChip from "@/components/address-book/search/TagChip";

const styles = {
  body: clsx("max-w-100 flex flex-col"),
  loading: clsx("p-2 flex gap-2 items-center justify-center"),
  category: clsx("py-3 first:pt-0 last:pb-2"),
  categoryHeader: clsx(
    "pb-1 mb-3 border-b border-dashed border-(--gray-7) text-sm font-medium",
  ),
  tagList: clsx("flex gap-2 flex-wrap"),
};

export default function TagPopoverContent() {
  const { t } = useTranslation();
  const { language } = useAtomValue(appConfigAtom);
  const { data: tagsRecord, isLoading } = useGetAllTagsQuery(language);
  const selectedTags = useAtomValue(selectedTagsAtom);
  const selectedTagsSet = useMemo(() => new Set(selectedTags), [selectedTags]);
  return (
    <div className={styles.body}>
      {isLoading && (
        <div className={styles.loading}>
          <LoaderCircle size={16} className="animate-spin" />
          <p className="text-sm">{t("addressBook.tags.loading")}</p>
        </div>
      )}
      {tagsRecord &&
        Object.entries(tagsRecord?.tags).map(([category, tags]) => (
          <div key={category} className={styles.category}>
            <h3 className={styles.categoryHeader}>{t(`addressBook.tags.${category}`)}</h3>
            <div className={styles.tagList}>
              {tags.map((tag) => (
                <TagChip
                  key={`${category}-${tag}`}
                  text={tag}
                  activeStyle={selectedTagsSet.has(tag)}
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
