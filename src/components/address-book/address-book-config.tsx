import { lazy } from "react";
import RequestTab from "./RequestTab";

const SearchTab = lazy(() => import("@/components/address-book/search/SearchTab"));
const SavedTab = lazy(() => import("@/components/address-book/saved/SavedTab"));

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
