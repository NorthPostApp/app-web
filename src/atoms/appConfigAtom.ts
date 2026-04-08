import { LOCAL_STORAGE_KEY, SUPPORTED_THEMES } from "@/consts/app-config";
import { AppConfig, type AppConfigSchema } from "@/schemas/app-config";
import { atom } from "jotai";

// should load from local storage if exists
const defaultConfig: AppConfigSchema = {
  language: "EN",
  theme: "light",
};

const getLocalAppConfig = () => {
  const localAppConfig = localStorage.getItem(LOCAL_STORAGE_KEY) || "{}";
  const parsedResult = AppConfig.safeParse(JSON.parse(localAppConfig));
  if (!parsedResult.success) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(defaultConfig));
    return defaultConfig;
  }
  return parsedResult.data;
};

const updateLocalConfig = (newConfig: AppConfigSchema) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newConfig));
};

const appConfigAtom = atom(getLocalAppConfig());

// update theme
const derivedThemeAtom = atom(null, (get, set) => {
  const prevConfig = get(appConfigAtom);
  const currThemeIndex = SUPPORTED_THEMES.indexOf(prevConfig.theme);
  const nextThemeIndex = (currThemeIndex + 1) % SUPPORTED_THEMES.length;
  const newConfig = { ...prevConfig, theme: SUPPORTED_THEMES[nextThemeIndex] };
  updateLocalConfig(newConfig);
  set(appConfigAtom, newConfig);
});

// update language
const derivedLanguageAtom = atom(
  null,
  (get, set, language: AppConfigSchema["language"]) => {
    const prevConfig = get(appConfigAtom);
    if (language !== prevConfig.language) {
      const newConfig = { ...prevConfig, language };
      updateLocalConfig(newConfig);
      set(appConfigAtom, { ...prevConfig, language });
    }
  },
);

export { appConfigAtom, derivedThemeAtom, derivedLanguageAtom };
