import { useTranslation } from "react-i18next";
import { I18nManager } from "react-native";
import i18n from "@/lib/i18n";
import RNRestart from "react-native-restart";

export const useLanguageFont = () => {
  const { i18n: i18nInstance } = useTranslation();
  const isArabic = i18nInstance.language === "ar";

  return {
    fontFamily: isArabic ? "cairo" : "rubik",
    isArabic,
    isRTL: isArabic,
  };
};

export const switchLanguage = async (lang: "en" | "ar") => {
  const needsRTL = lang === "ar";

  await i18n.changeLanguage(lang);

  I18nManager.allowRTL(needsRTL);
  I18nManager.forceRTL(needsRTL);

  setTimeout(async () => {
    try {
      RNRestart.Restart();
    } catch (error) {
      console.error(`Error fetching update: ${error}`);
    }
  }, 500);
};

// Helper function to get font variant based on weight and language
export const getFontFamily = (
  weight: "regular" | "medium" | "bold" | "semibold" | "light" | "extrabold",
  language: string,
): string => {
  if (language === "ar") {
    switch (weight) {
      case "regular":
        return "cairo";
      case "medium":
        return "cairo-medium";
      case "bold":
        return "cairo-bold";
      case "semibold":
        return "cairo-semibold";
      case "light":
        return "cairo-light";
      case "extrabold":
        return "cairo-extrabold";
      default:
        return "cairo";
    }
  } else {
    switch (weight) {
      case "regular":
        return "rubik";
      case "medium":
        return "rubik-medium";
      case "bold":
        return "rubik-bold";
      case "semibold":
        return "rubik-semibold";
      case "light":
        return "rubik-light";
      case "extrabold":
        return "rubik-extrabold";
      default:
        return "rubik";
    }
  }
};
