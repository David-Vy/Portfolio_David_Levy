// src/context/LanguageContext.tsx
"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { Language, TranslationDictionary, translations } from "@/lib/translations";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: TranslationDictionary;
}

const STORAGE_KEY = "portfolio_preferred_language";

const LanguageContext = createContext<LanguageContextType>({
  language: "pt",
  setLanguage: () => {},
  toggleLanguage: () => {},
  t: translations.pt,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("pt");

  // Inicialização inteligente no cliente baseada no dispositivo ou escolha salva
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as Language | null;
      if (stored === "pt" || stored === "en") {
        setLanguageState(stored);
        document.documentElement.lang = stored === "pt" ? "pt-BR" : "en-US";
        return;
      }

      // Detecção automática do idioma do dispositivo/navegador
      const navLang = (navigator.language || (navigator as { userLanguage?: string }).userLanguage || "").toLowerCase();
      const detected: Language = navLang.startsWith("en") ? "en" : "pt";
      setLanguageState(detected);
      document.documentElement.lang = detected === "pt" ? "pt-BR" : "en-US";
    } catch {
      // Fallback gracioso para ambientes restritos
      setLanguageState("pt");
    }
  }, []);

  const setLanguage = useCallback((newLang: Language) => {
    setLanguageState(newLang);
    try {
      localStorage.setItem(STORAGE_KEY, newLang);
      document.documentElement.lang = newLang === "pt" ? "pt-BR" : "en-US";
    } catch {
      // Ignora erro de armazenamento local
    }
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguage(language === "pt" ? "en" : "pt");
  }, [language, setLanguage]);

  const value: LanguageContextType = {
    language,
    setLanguage,
    toggleLanguage,
    t: translations[language],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
