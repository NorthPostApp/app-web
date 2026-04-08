import { createStore, useAtomValue } from "jotai";
import { render, screen } from "@testing-library/react";
import { LOCAL_STORAGE_KEY } from "@/consts/app-config";
import { renderWithProviders } from "@/lib/test-utils";

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

describe("appConfigAtom", () => {
  afterEach(() => {
    localStorage.clear();
  });
  it("load from default config", async () => {
    const MockComponent = await mockForLocalLoading();
    render(<MockComponent />);
    expect(screen.getByText("EN")).toBeTruthy();
    expect(screen.getByText("light")).toBeTruthy();
  });

  it("load from localStorage", async () => {
    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify({
        language: "ZH",
        theme: "dark",
      }),
    );
    const store = createStore();
    const MockComponent = await mockForLocalLoading();
    renderWithProviders(<MockComponent />, store);
    expect(screen.getByText("ZH")).toBeTruthy();
    expect(screen.getByText("dark")).toBeTruthy();
  });
});
