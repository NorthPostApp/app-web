import { lazy } from "react";
import SavedTab from "./SavedTab";
import RequestTab from "./RequestTab";

const SearchTab = lazy(() => import("@/components/address-book/search/SearchTab"));

const addressBookTabs: string[] = ["saved", "search", "request"];

const getTabContent = (tabValue: string) => {
  switch (tabValue) {
    case "search":
      return <SearchTab />;
    case "request":
      return <RequestTab />;
    default:
      return <SavedTab />;
  }
};

export { addressBookTabs, getTabContent };
