import { useTranslation } from "react-i18next";
import { keywordsAtom } from "@/atoms/addressAtoms";
import { useAtom } from "jotai";
import Input from "@/components/ui/Input";

export default function KeywordInput() {
  const [keywords, setKeywords] = useAtom(keywordsAtom);
  const { t } = useTranslation();
  return (
    <Input
      className="h-8 flex-1"
      placeholder={t("addressBook.search.placeholder")}
      value={keywords}
      onChange={(e) => setKeywords(e.target.value)}
    />
  );
}
