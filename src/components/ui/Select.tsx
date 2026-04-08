import cn from "@/lib/cn";
import { ChevronDown } from "lucide-react";
import { Select as BaseSelect, type SelectRootChangeEventDetails } from "@base-ui/react";
import "./Select.css";

type SelectProps = {
  items: { label: string; value: string }[];
  defaultValue?: string;
  activeValue: string;
  onValueChange: (
    value: string | null,
    eventDetails: SelectRootChangeEventDetails,
  ) => void;
  size?: "sm" | "lg";
  alignItemWithTrigger?: boolean;
};

const getWidth = (size: string | undefined) => {
  switch (size) {
    case "sm":
      return "min-w-30";
    case "lg":
      return "min-w-40";
    default:
      return "min-w-40";
  }
};

export default function Select({
  items,
  defaultValue,
  activeValue,
  onValueChange,
  size,
  alignItemWithTrigger = false,
}: SelectProps) {
  const widthInTailwindUnit = getWidth(size);
  return (
    <BaseSelect.Root
      items={items}
      defaultValue={defaultValue || null}
      value={activeValue}
      name="blockType"
      onValueChange={onValueChange}
    >
      <BaseSelect.Trigger
        className={cn(
          widthInTailwindUnit,
          "box-border flex items-center justify-between gap-4 h-8 pl-3.5 pr-3 m-0 rounded-2xl font-medium text-sm",
        )}
      >
        <BaseSelect.Value />
        <ChevronDown size={16} />
      </BaseSelect.Trigger>
      <BaseSelect.Portal>
        <BaseSelect.Positioner
          sideOffset={8}
          className="outline-none z-10 select-none"
          alignItemWithTrigger={alignItemWithTrigger}
        >
          <BaseSelect.Popup className="select-popup rounded-3xl shadow-(--base-shadow) bg-clip-padding min-w-(--anchor-width) origin-(--transform-origin) transition-[transform,scale,opacity] data-ending-style:scale-90 data-ending-style:opacity-0 data-[side=none]:min-w-[calc(var(--anchor-width)+0.5rem)]">
            <BaseSelect.List className="relative py-2 scroll-py-6 overflow-y-auto max-h-(--available-height) text-sm">
              {items.map(({ label, value }) => (
                <BaseSelect.Item
                  key={label}
                  value={value}
                  className={cn(
                    "py-1.5 mx-2 px-3 rounded-2xl",
                    activeValue === value ? "font-medium bg-(--gray-2)" : "",
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
