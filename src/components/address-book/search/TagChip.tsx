import { memo } from "react";
import { useSetAtom } from "jotai";
import cn from "@/lib/cn";
import { derivedSetTagsAtom } from "@/atoms/addressAtoms";

type TagChipProps = {
  text: string;
  activeStyle: boolean;
  disabled?: boolean;
};

const styles = {
  body: "text-[13px] px-2.5 py-0.5 rounded-full hover:cursor-pointer",
  active: "ring-0 bg-(--gray-11) text-(--color-background)",
  inactive: "ring ring-(--gray-7) bg-(--color-background)",
  disabled: "opacity-35 hover:cursor-default",
};

function TagChip({ text, activeStyle, disabled = false }: TagChipProps) {
  const toggleTag = useSetAtom(derivedSetTagsAtom);
  return (
    <div
      className={cn(
        styles.body,
        activeStyle ? styles.active : styles.inactive,
        disabled && styles.disabled,
      )}
      onClick={(e) => {
        if (disabled) return;
        e.stopPropagation();
        toggleTag(text);
      }}
    >
      {text}
    </div>
  );
}

const MemoedTagChips = memo(TagChip);

export default MemoedTagChips;
