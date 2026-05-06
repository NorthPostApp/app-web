import SavedTab from "./SavedTab";
import SearchTab from "./search/SearchTab";
import RequestTab from "./RequestTab";

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
