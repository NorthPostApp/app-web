import { useState } from "react";
import { useTranslation } from "react-i18next";
import cn from "@/lib/cn";
import TabContent from "@/components/address-book/TabContent";
import {
  addressBookTabs,
  getTabContent,
} from "@/components/address-book/address-book-config";

const styles = {
  body: "relative flex w-200 h-180 p-4",
  background:
    "bg-grid -z-10 absolute left-0 top-0 w-full h-full rounded-4xl shadow-(--base-shadow)",
  inner: "flex flex-1 items-end",
  tabSection:
    "relative flex h-fit w-8 justify-center items-center border-dashed border border-(--accent-a6) border-r-0 rounded-l-2xl",
  tabSelector: "group-hover:cursor-pointer text-center text-sm h-19",
  tabIndicator:
    "absolute w-full h-19 bg-(--accent-a8) -z-10 rounded-l-2xl duration-100 transition-all",
  content:
    "w-full h-full border-dashed border border-(--accent-a6) overflow-x-hidden bg-(--color-background) rounded-3xl p-4 rounded-bl-none inset-shadow-(--base-shadow-inset)",
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
