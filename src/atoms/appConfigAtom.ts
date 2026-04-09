import { atom } from "jotai";
import {
  getLocalAppConfig,
  SUPPORTED_THEMES,
  updateLocalConfig,
  type AppConfigSchema,
} from "@/consts/app-config";
import i18n from "@/i18n/config";

const updateTheme = (theme: AppConfigSchema["theme"]) => {
  const root = window.document.documentElement;
  root.classList.remove("light", "dark");
  if (theme === "system") {
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
    root.classList.add(systemTheme);
  } else {
    root.classList.add(theme);
  }
};

const appConfigAtom = atom(getLocalAppConfig());

// update theme
const derivedThemeAtom = atom(null, (get, set) => {
  const prevConfig = get(appConfigAtom);
  const currThemeIndex = SUPPORTED_THEMES.indexOf(prevConfig.theme);
  const nextThemeIndex = (currThemeIndex + 1) % SUPPORTED_THEMES.length;
  const newConfig = { ...prevConfig, theme: SUPPORTED_THEMES[nextThemeIndex] };
  updateTheme(newConfig.theme);
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
      i18n.changeLanguage(language.toLocaleLowerCase());
      updateLocalConfig(newConfig);
      set(appConfigAtom, newConfig);
    }
  },
);

export { appConfigAtom, derivedThemeAtom, derivedLanguageAtom };
