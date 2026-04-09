import { DEFAULT_LANGUAGE, getLocalAppConfig } from "@/consts/app-config";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import resourcesToBackend from "i18next-resources-to-backend";

const localAppConfig = getLocalAppConfig();
const initialLanguage = localAppConfig.language ?? DEFAULT_LANGUAGE;

i18n
  .use(initReactI18next)
  .use(
    resourcesToBackend((language: string) => {
      return import(`./locales/${language}.json`);
    }),
  )
  .init({
    lng: initialLanguage.toLocaleLowerCase(),
    fallbackLng: "en",
    debug: import.meta.env.MODE === "development",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
