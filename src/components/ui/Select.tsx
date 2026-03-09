import cn from "@/lib/cn";
import { ChevronDown } from "lucide-react";
import { Select as BaseSelect, type SelectRootChangeEventDetails } from "@base-ui/react";

type SelectProps = {
  items: { label: string; value: string }[];
  defaultValue: string;
  activeValue: string;
  onValueChange: (
    value: string | null,
    eventDetails: SelectRootChangeEventDetails,
  ) => void;
};

export default function Select({
  items,
  defaultValue,
  activeValue,
  onValueChange,
}: SelectProps) {
  return (
    <BaseSelect.Root
      items={items}
      defaultValue={defaultValue}
      name="blockType"
      onValueChange={onValueChange}
    >
      <BaseSelect.Trigger className="box-border flex items-center justify-between gap-4 h-8 pl-3.5 min-w-40 pr-3 m-0 border border-gray-100 rounded-2xl font-medium text-sm">
        <BaseSelect.Value />
        <ChevronDown size={16} />
      </BaseSelect.Trigger>
      <BaseSelect.Portal>
        <BaseSelect.Positioner sideOffset={8} className="outline-none z-10 select-none">
          <BaseSelect.Popup className="rounded-2xl bg-(--color-background) bg-clip-padding min-w-(--anchor-width) origin-(--transform-origin) border border-gray-100 transition-[transform,scale,opacity] data-ending-style:scale-90 data-ending-style:opacity-0 data-[side=none]:min-w-[calc(var(--anchor-width)+0.5rem)]">
            <BaseSelect.List className="relative py-1 scroll-py-6 overflow-y-auto max-h-(--available-height) text-sm">
              {items.map(({ label, value }) => (
                <BaseSelect.Item
                  key={label}
                  value={value}
                  className={cn(
                    "pl-4 pr-3 my-1",
                    activeValue === value ? "font-medium bg-gray-100" : "",
                  )}
                >
                  <BaseSelect.ItemText>{label}</BaseSelect.ItemText>
                </BaseSelect.Item>
              ))}
            </BaseSelect.List>
          </BaseSelect.Popup>
        </BaseSelect.Positioner>
      </BaseSelect.Portal>
    </BaseSelect.Root>
  );
}
