import cn from "@/lib/cn";
import type { PropsWithChildren } from "react";
type TabContentProps = {
  direction?: "rtl" | "ltr";
} & PropsWithChildren;

const styles = {
  body: "w-full h-full",
  slideLtr: "animate-[slide-in-ltr_0.3s_ease-in-out_forwards]",
  slideRtl: "animate-[slide-in-rtl_0.3s_ease-in-out_forwards]",
};

export default function TabContent({ direction, children }: TabContentProps) {
  return (
    <div
      className={cn(styles.body, direction === "ltr" ? styles.slideLtr : styles.slideRtl)}
    >
      {children}
    </div>
  );
}
