import { useAtomValue } from "jotai";
import { useTranslation } from "react-i18next";
import { selectedTagsAtom } from "@/atoms/addressAtoms";
import { MAX_NUM_TAGS } from "@/components/address-book/search/consts";

export default function TagPopoverTrigger() {
  const selectedTags = useAtomValue(selectedTagsAtom);
  const { t } = useTranslation();
  return (
    <div className="w-full text-sm rounded-full py-0.5 hover:underline">
      {selectedTags.length < MAX_NUM_TAGS
        ? t("addressBook.tags.add")
        : t("addressBook.tags.limit")}
    </div>
  );
}
