import { createStore, useAtomValue } from "jotai";
import { render, screen } from "@testing-library/react";
import { LOCAL_STORAGE_KEY } from "@/consts/app-config";
import { renderWithProviders } from "@/lib/test-utils";
import { appConfigAtom, derivedLanguageAtom, updateTheme } from "./appConfigAtom";
import { keywordsAtom, selectedTagsAtom } from "./addressAtoms";

const mockForLocalLoading = async () => {
  vi.resetModules();
  const { appConfigAtom } = await import("./appConfigAtom");
  const MockForLocalLoading = () => {
    const appConfig = useAtomValue(appConfigAtom);
    return (
      <div>
        <p>
          theme: <span>{appConfig.theme}</span>
        </p>
        <p>
          language: <span>{appConfig.language}</span>
        </p>
      </div>
    );
  };
  return MockForLocalLoading;
};

const mockMatchMedia = (prefersDark: boolean) => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: prefersDark,
      media: query,
    })),
  });
};

describe("appConfigAtom", () => {
  beforeEach(() => {
    document.documentElement.classList.remove("light", "dark");
    localStorage.clear();
  });
  it("load from default config", async () => {
    const MockComponent = await mockForLocalLoading();
    render(<MockComponent />);
    expect(screen.getByText("en")).toBeTruthy();
    expect(screen.getByText("light")).toBeTruthy();
  });

  it("load from localStorage", async () => {
    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify({
        language: "zh",
        theme: "dark",
      }),
    );
    const store = createStore();
    const MockComponent = await mockForLocalLoading();
    renderWithProviders(<MockComponent />, store);
    expect(screen.getByText("zh")).toBeTruthy();
    expect(screen.getByText("dark")).toBeTruthy();
  });

  it("should change language and clear search state", async () => {
    const store = createStore();
    store.set(appConfigAtom, { language: "en", theme: "light" });
    store.set(selectedTagsAtom, ["tag1", "tag2"]);
    store.set(keywordsAtom, "some keywords");
    store.set(derivedLanguageAtom, "zh");
    expect(store.get(appConfigAtom).language).toBe("zh");
    expect(store.get(selectedTagsAtom).length).toBe(0);
    expect(store.get(keywordsAtom)).toBe("");
  });

  it("should not change language and clear search state", async () => {
    const store = createStore();
    store.set(appConfigAtom, { language: "en", theme: "light" });
    store.set(selectedTagsAtom, ["tag1", "tag2"]);
    store.set(keywordsAtom, "some keywords");
    store.set(derivedLanguageAtom, "en");
    expect(store.get(appConfigAtom).language).toBe("en");
    expect(store.get(selectedTagsAtom).length).toBe(2);
    expect(store.get(keywordsAtom)).toBe("some keywords");
  });

  it("updateTheme", () => {
    mockMatchMedia(true);
    updateTheme("system");
    expect(document.documentElement.classList.contains("dark")).toBe(true);
    mockMatchMedia(false);
    updateTheme("system");
    expect(document.documentElement.classList.contains("light")).toBe(true);
    updateTheme("light");
    expect(document.documentElement.classList.contains("light")).toBe(true);
    updateTheme("dark");
    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });
});
