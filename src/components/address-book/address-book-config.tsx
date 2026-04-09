import SavedTab from "./tabs/SavedTab";
import SearchTab from "./tabs/SearchTab";
import RequestTab from "./tabs/RequestTab";

// type TabContent = {
//   value: string;
//   displayName: string;
// };

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
