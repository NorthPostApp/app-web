import cn from "@/lib/cn";
import type { PropsWithChildren } from "react";
type TabContentProps = {
  direction?: "rtl" | "ltr";
} & PropsWithChildren;

export default function TabContent({ direction, children }: TabContentProps) {
  return (
    <div
      className={cn(
        "tab-content",
        direction === "ltr" ? "tab-content__ltr" : "tab-content__rtl",
      )}
    >
      {children}
    </div>
  );
}
