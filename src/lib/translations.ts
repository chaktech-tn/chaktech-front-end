// Translation utility functions for frontend
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5001";

export interface TranslationCache {
  [locale: string]: { [key: string]: string };
}

let translationCache: TranslationCache = {};

// Fetch translations from backend API
export const fetchTranslations = async (
  locale: string,
  category?: string
): Promise<{ [key: string]: string }> => {
  try {
    // Check cache first
    const cacheKey = category ? `${locale}-${category}` : locale;
    if (translationCache[cacheKey]) {
      return translationCache[cacheKey];
    }

    const url = category
      ? `${API_BASE_URL}/api/translations/${locale}/${category}`
      : `${API_BASE_URL}/api/translations/${locale}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch translations");
    }

    const data = await response.json();
    if (data.success && data.data) {
      translationCache[cacheKey] = data.data;
      return data.data;
    }

    return {};
  } catch (error) {
    console.error("Error fetching translations:", error);
    return {};
  }
};

// Get translation by key
export const getTranslation = (
  translations: { [key: string]: string },
  key: string,
  fallback?: string
): string => {
  return translations[key] || fallback || key;
};

// Clear translation cache
export const clearTranslationCache = () => {
  translationCache = {};
};

// Preload translations for a locale
export const preloadTranslations = async (
  locale: string,
  categories?: string[]
): Promise<void> => {
  try {
    if (categories && categories.length > 0) {
      await Promise.all(
        categories.map((category) => fetchTranslations(locale, category))
      );
    } else {
      await fetchTranslations(locale);
    }
  } catch (error) {
    console.error("Error preloading translations:", error);
  }
};

