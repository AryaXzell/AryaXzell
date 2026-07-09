import React, { createContext, useContext, useState, useEffect } from "react";
import { Language, languages, translations, LanguageConfig } from "./locales";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => any;
  currentLangConfig: LanguageConfig;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem("language");
      if (saved && (saved === "en" || saved === "id" || saved === "ru" || saved === "ar" || saved === "es" || saved === "ja")) {
        return saved as Language;
      }
    } catch (e) {
      console.warn("Storage access restricted, using default language. Error:", e);
    }
    // Simple browser language detection
    const browserLang = navigator.language.split("-")[0];
    if (browserLang === "id") return "id";
    if (browserLang === "ru") return "ru";
    if (browserLang === "ar") return "ar";
    if (browserLang === "es") return "es";
    if (browserLang === "ja") return "ja";
    return "en";
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem("language", lang);
    } catch (e) {
      console.warn("Storage save restricted, language choice will persist in-memory. Error:", e);
    }
  };

  const currentLangConfig = languages.find((l) => l.code === language) || languages[0];

  // Sync text direction and language attributes on HTML tag
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("lang", language);
    root.setAttribute("dir", currentLangConfig.dir);
  }, [language, currentLangConfig]);

  const t = (key: string): any => {
    const dict = translations[language];
    if (dict && dict[key] !== undefined) {
      return dict[key];
    }
    // Fallback to English
    const fallbackDict = translations["en"];
    if (fallbackDict && fallbackDict[key] !== undefined) {
      return fallbackDict[key];
    }
    return key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, currentLangConfig }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
