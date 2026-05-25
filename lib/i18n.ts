import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";
import en from "../language/en";
import ar from "../language/ar";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "language";

const languageDetector = {
  type: "languageDetector" as const,
  async: true, // Tells i18next to wait for AsyncStorage to resolve
  init: () => {},
  detect: async (callback: any) => {
    try {
      // Step A: Check if the user previously chose a language manually
      const savedLanguage = await AsyncStorage.getItem(STORAGE_KEY);
      if (savedLanguage) {
        return callback(savedLanguage);
      }

      // Step B: Fall back to system device locale if nothing is stored
      const deviceLanguage = Localization.getLocales()[0]?.languageCode || "en";
      callback(deviceLanguage);
    } catch (error) {
      console.error("Error reading language", error);
      callback("en"); // Final safe fallback
    }
  },
  cacheUserLanguage: async (lng: any) => {
    try {
      // Automatically triggers when i18n.changeLanguage() is called
      await AsyncStorage.setItem(STORAGE_KEY, lng);
    } catch (error) {
      console.error("Error saving language", error);
    }
  },
};

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    compatibilityJSON: "v4",
    resources: {
      en: {
        translation: en,
      },
      ar: {
        translation: ar,
      },
    },
    fallbackLng: "ar",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
