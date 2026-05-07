import type { ComponentProps } from "react";
import cn from "@/lib/cn";
import { Button as BaseButton } from "@base-ui/react";

type Variants = "solid" | "vice";

type ButtonProps = {
  active?: boolean;
  variant?: Variants;
} & ComponentProps<typeof BaseButton>;

const styles = {
  solid: "bg-(--accent-a9) hover:bg-(--accent-11) rounded-full",
};

const getVariantStyle = (variant: Variants) => {
  switch (variant) {
    case "solid":
      return styles.solid;
    default:
      return "";
  }
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
        className,
        active ? "opacity-100" : "opacity-30",
        variant && getVariantStyle(variant),
      )}
    >
      {children}
    </BaseButton>
  );
}
