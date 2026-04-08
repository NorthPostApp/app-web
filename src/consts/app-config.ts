const MODIFIER_KEY_PREFIX = navigator.platform.startsWith("Mac") ? "⌘" : "Ctrl";

// App languages
const SUPPORTED_LANGUAGES = ["ZH", "EN"] as const;
const LANGUAGES_LIST: { label: string; value: (typeof SUPPORTED_LANGUAGES)[number] }[] = [
  { label: "中文", value: "ZH" },
  { label: "English", value: "EN" },
] as const;

const DEFAULT_LANGUAGE = "EN";

// Themes
const SUPPORTED_THEMES = ["light", "dark", "system"] as const;

// App localStorage
const LOCAL_STORAGE_KEY = "north-post-app";

export {
  LANGUAGES_LIST,
  DEFAULT_LANGUAGE,
  MODIFIER_KEY_PREFIX,
  LOCAL_STORAGE_KEY,
  SUPPORTED_LANGUAGES,
  SUPPORTED_THEMES,
};
