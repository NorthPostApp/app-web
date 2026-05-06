import cn from "@/lib/cn";
import { useSetAtom } from "jotai";
import { derivedSetTagsAtom } from "@/atoms/addressAtoms";

type TagChipProps = {
  text: string;
  active: boolean;
};

export default function TagChip({ text, active }: TagChipProps) {
  const toggleTag = useSetAtom(derivedSetTagsAtom);
  return (
    <div
      className={cn(
        "text-sm px-2.5 py-0.2 rounded-full hover:cursor-pointer",
        active
          ? "ring-none bg-(--gray-11) text-(--color-background)"
          : "ring ring-(--gray-8)",
      )}
      onClick={() => toggleTag(text)}
    >
      {text}
    </div>
  );
}
