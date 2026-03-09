import type { ComponentProps } from "react";
import cn from "@/lib/cn";
import { Button as BaseButton } from "@base-ui/react";

type ButtonProps = {
  active?: boolean;
} & ComponentProps<typeof BaseButton>;

export default function Button({ active = true, children, ...props }: ButtonProps) {
  const { className, ...restProps } = props;
  return (
    <BaseButton
      {...restProps}
      className={cn(
        "p-1 rounded-xl shadow-xl",
        className,
        active ? "opacity-100" : "opacity-30",
      )}
    >
      {children}
    </BaseButton>
  );
}
