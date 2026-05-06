import { Input as BaseInput } from "@base-ui/react";
import cn from "@/lib/cn";
import type { ComponentProps } from "react";

type InputProps = {} & ComponentProps<typeof BaseInput>;

export default function Input({ ...props }: InputProps) {
  const { className, ...restProps } = props;
  return (
    <BaseInput
      {...restProps}
      className={cn(
        "w-full inset-shadow-(--base-shadow-inset) rounded-full px-4 py-1 h-fit text-sm",
        className,
      )}
    />
  );
}
