import type { ComponentProps } from "react";
import cn from "@/lib/cn";
import { Button as BaseButton } from "@base-ui/react";

type Variants = "solid" | "light";

type ButtonProps = {
  active?: boolean;
  variant?: Variants;
} & ComponentProps<typeof BaseButton>;

const styles: Record<Variants, string> = {
  solid: "w-9 h-9 p-0 bg-(--accent-a9) hover:bg-(--accent-11) rounded-full",
  light: "w-7 h-7 p-0",
};

const getVariantStyle = (variant: Variants) => {
  return styles[variant] || "";
};

export default function Button({
  active = true,
  variant,
  children,
  ...props
}: ButtonProps) {
  const { className, ...restProps } = props;
  return (
    <BaseButton
      {...restProps}
      className={cn(
        "p-1 rounded-xl hover:cursor-pointer",
        active ? "opacity-100" : "opacity-30",
        variant && getVariantStyle(variant),
        className,
      )}
    >
      {children}
    </BaseButton>
  );
}
