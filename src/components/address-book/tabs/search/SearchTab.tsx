import { useTranslation } from "react-i18next";
import { Search } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Popover from "@/components/ui/Popover";
import TagPopoverTrigger from "@/components/address-book/tabs/search/TagPopoverTrigger";
import TagPopoverContent from "@/components/address-book/tabs/search/TagPopoverContent";

export default function SearchTab() {
  const { t } = useTranslation();
  return (
    <div className="w-full flex flex-col">
      {/* Text input */}
      <div className="w-full flex gap-3 items-center justify-between">
        <Input className="h-8 flex-1" placeholder={t("addressBook.search.placeholder")} />
        <Button className="bg-(--gray-a9) hover:bg-(--accent-a9) rounded-full h-7 w-7">
          <Search size={18} className="mx-auto my-auto stroke-(--color-background)" />
        </Button>
      </div>
      {/* Tag Chips */}
      <Popover trigger={<TagPopoverTrigger />}>
        <TagPopoverContent />
      </Popover>
    </div>
  );
}
