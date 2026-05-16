import { useState } from "react";
import { useTranslation } from "react-i18next";
import cn from "@/lib/cn";
import TabContent from "@/components/address-book/TabContent";
import {
  addressBookTabs,
  getTabContent,
} from "@/components/address-book/address-book-config";
import clsx from "clsx";

const styles = {
  body: clsx("relative flex w-200 h-220 p-4"),
  background: clsx(
    "bg-grid -z-10 absolute left-0 top-0 w-full h-full rounded-4xl shadow-(--base-shadow)",
  ),
  inner: clsx("flex flex-1 items-end"),
  tabSection: clsx(
    "relative flex h-fit w-8 justify-center items-center border-dashed border-2 border-(--accent-6) border-r-0 rounded-l-2xl",
  ),
  tabSelector: clsx("group-hover:cursor-pointer text-center text-sm h-19"),
  tabIndicator: clsx(
    "absolute w-full h-19 bg-(--accent-8) -z-1 rounded-l-2xl duration-100 transition-all",
  ),
  content: clsx(
    "w-full h-full border-dashed border-2 border-(--accent-6) overflow-x-hidden bg-(--color-background) rounded-3xl p-4 rounded-bl-none inset-shadow-(--base-shadow-inset)",
  ),
};

export default function AddressBook() {
  const [indexMap, setIndexMap] = useState<{ prev: number; curr: number }>({
    prev: 0,
    curr: 0,
  });

  const { t } = useTranslation();

  const animateDirection = indexMap.curr - indexMap.prev > 0 ? "rtl" : "ltr";
  const currTab = addressBookTabs[indexMap.curr];

  const selectTab = (index: number) => {
    const maxIndex = addressBookTabs.length - 1;
    const minIndex = 0;
    const nextIndex = Math.max(minIndex, Math.min(maxIndex, index));
    if (indexMap.curr === nextIndex) return;
    setIndexMap((prevMap) => ({
      prev: prevMap.curr,
      curr: nextIndex,
    }));
  };

  return (
    <div className={styles.body}>
      <div className={styles.inner}>
        <div className={cn(styles.tabSection, "group text-sideway")}>
          {addressBookTabs.map((tabName, index) => (
            <div
              key={tabName}
              className={cn(styles.tabSelector, tabName === currTab && "text-(--gray-1)")}
              onClick={() => selectTab(index)}
            >
              {t(`addressBook.tabs.${tabName}`)}
            </div>
          ))}
          <div
            className={styles.tabIndicator}
            style={{
              bottom: `${indexMap.curr * 76}px`,
            }}
          ></div>
        </div>
        <div className={styles.content}>
          <TabContent direction={animateDirection} key={currTab}>
            {getTabContent(currTab)}
          </TabContent>
        </div>
      </div>
      <div className={styles.background}></div>
    </div>
  );
}
