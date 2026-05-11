import { memo } from "react";
import { useSetAtom } from "jotai";
import clsx from "clsx";
import cn from "@/lib/cn";
import { derivedSetTagsAtom } from "@/atoms/addressAtoms";

type TagChipProps = {
  text: string;
  activeStyle: boolean;
  disabled?: boolean;
};

const styles = {
  body: clsx("text-[13px] px-2.5 py-0.5 rounded-full hover:cursor-pointer"),
  active: clsx("ring-0 bg-(--accent-9) text-(--color-background)"),
  inactive: clsx("ring ring-(--gray-7) bg-(--color-background)"),
  disabled: clsx("opacity-35 hover:cursor-default"),
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
