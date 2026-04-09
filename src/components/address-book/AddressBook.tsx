import { useState } from "react";
import cn from "@/lib/cn";
import TabContent from "@/components/address-book/tabs/TabContent";
import {
  addressBookTabs,
  getTabContent,
} from "@/components/address-book/address-book-config";
import "./AddressBook.css";
import { useTranslation } from "react-i18next";

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
    <div className="address-book">
      <div className="address-book__inner">
        <div className="address-book__tabs group text-sideway">
          {addressBookTabs.map((tabName, index) => (
            <div
              key={tabName}
              className={cn(
                "address-book__tab__selector h-19",
                tabName === currTab && "text-(--gray-1)",
              )}
              onClick={() => selectTab(index)}
            >
              {t(`addressBook.tabs.${tabName}`)}
            </div>
          ))}
          <div
            className="address-book__tab__indicator h-19"
            style={{
              bottom: `${indexMap.curr * 76}px`,
            }}
          ></div>
        </div>
        <div className="address-book__tab__body">
          <TabContent direction={animateDirection} key={currTab}>
            {getTabContent(currTab)}
          </TabContent>
        </div>
      </div>
      <div className="bg-grid address-book__bg"></div>
    </div>
  );
}
