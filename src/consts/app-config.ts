import * as z from "zod";

const MODIFIER_KEY_PREFIX = navigator.platform.startsWith("Mac") ? "⌘" : "Ctrl";

// App languages
const SUPPORTED_LANGUAGES = ["ZH", "EN"] as const;
const DEFAULT_LANGUAGE = "EN";

const LANGUAGES_LIST: { label: string; value: (typeof SUPPORTED_LANGUAGES)[number] }[] = [
  { label: "中文", value: "ZH" },
  { label: "English", value: "EN" },
] as const;

// Themes
const SUPPORTED_THEMES = ["light", "dark", "system"] as const;

// should load from local storage if exists
const DEFAULT_CONFIG: AppConfigSchema = {
  language: DEFAULT_LANGUAGE,
  theme: "light",
};

// App localStorage
const LOCAL_STORAGE_KEY = "north-post-app";

const AppConfig = z.object({
  language: z.enum(SUPPORTED_LANGUAGES),
  theme: z.enum(SUPPORTED_THEMES),
});

type AppConfigSchema = z.infer<typeof AppConfig>;

const getLocalAppConfig = () => {
  const localAppConfig = localStorage.getItem(LOCAL_STORAGE_KEY) || "{}";
  const parsedResult = AppConfig.safeParse(JSON.parse(localAppConfig));
  if (!parsedResult.success) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(DEFAULT_CONFIG));
    return DEFAULT_CONFIG;
  }
  return parsedResult.data;
};

const updateLocalConfig = (newConfig: AppConfigSchema) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newConfig));
};

export {
  LANGUAGES_LIST,
  DEFAULT_LANGUAGE,
  MODIFIER_KEY_PREFIX,
  LOCAL_STORAGE_KEY,
  SUPPORTED_LANGUAGES,
  SUPPORTED_THEMES,
  DEFAULT_CONFIG,
  AppConfig,
  getLocalAppConfig,
  updateLocalConfig,
};

export type { AppConfigSchema };
