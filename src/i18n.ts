import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next, useTranslation } from "react-i18next";

enum SupportedLanguages {
  "en" = "en",
  "de" = "de",
}

interface LanguageResource {
  welcome: string;
  homeInstruction: string;
}

interface DefaultNamespaceWrapper {
  translation: LanguageResource;
}

type LanguageResources = {
  [key in SupportedLanguages]: DefaultNamespaceWrapper;
};

const resources: LanguageResources = {
  de: {
    translation: {
      welcome: "Willkommen bei Famly infinite scroll!",
      homeInstruction: "Bitte warten Sie, während die Daten geladen werden.",
    },
  },
  en: {
    translation: {
      welcome: "Welcome to Famly infinite scroll!",
      homeInstruction: "Please wait while the data is being fetched.",
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    resources: resources as any,
  });

export function useLanguageTranslation(): [
  t: (key: keyof LanguageResource, param?: any) => string,
  i18n: typeof i18n,
  ready: boolean
] {
  return useTranslation();
}
