"use client";
import { useState, useEffect, useContext, createContext } from "react";

import { fetchTranslations, getTranslation } from "../lib/translations";

interface TranslationContextType {
  translations: { [key: string]: string };
  locale: string;
  t: (key: string, fallback?: string) => string;
  isLoading: boolean;
}

const TranslationContext = createContext<TranslationContextType | undefined>(
  undefined
);

export const TranslationProvider = ({
  children,
  locale = "fr",
  categories,
}: {
  children: React.ReactNode;
  locale?: string;
  categories?: string[];
}) => {
  const [translations, setTranslations] = useState<{ [key: string]: string }>(
    {}
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadTranslations = async () => {
      setIsLoading(true);
      try {
        let allTranslations: { [key: string]: string } = {};

        if (categories && categories.length > 0) {
          // Load translations for specific categories
          const categoryTranslations = await Promise.all(
            categories.map((category) => fetchTranslations(locale, category))
          );
          categoryTranslations.forEach((catTranslations) => {
            allTranslations = { ...allTranslations, ...catTranslations };
          });
        } else {
          // Load all translations
          allTranslations = await fetchTranslations(locale);
        }

        setTranslations(allTranslations);
      } catch (error) {
        console.error("Error loading translations:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadTranslations();
  }, [locale, categories]);

  const t = (key: string, fallback?: string): string => {
    return getTranslation(translations, key, fallback);
  };

  return (
    <TranslationContext.Provider value={{ translations, locale, t, isLoading }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = (): TranslationContextType => {
  const context = useContext(TranslationContext);
  if (!context) {
    // Return a fallback context if provider is not available
    return {
      translations: {},
      locale: "fr",
      t: (key: string, fallback?: string) => fallback || key,
      isLoading: false,
    };
  }
  return context;
};

