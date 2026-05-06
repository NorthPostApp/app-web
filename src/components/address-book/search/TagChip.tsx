import cn from "@/lib/cn";
import { useSetAtom } from "jotai";
import { derivedSetTagsAtom } from "@/atoms/addressAtoms";

type TagChipProps = {
  text: string;
  active: boolean;
  disabled?: boolean;
};

export default function TagChip({ text, active, disabled = false }: TagChipProps) {
  const toggleTag = useSetAtom(derivedSetTagsAtom);
  return (
    <div
      className={cn(
        "text-[13px] px-2.5 py-0.5 rounded-full hover:cursor-pointer",
        active
          ? "ring-0 bg-(--gray-11) text-(--color-background)"
          : "ring ring-(--gray-7) bg-(--color-background)",
        disabled ? "opacity-35 hover:cursor-default" : "",
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
