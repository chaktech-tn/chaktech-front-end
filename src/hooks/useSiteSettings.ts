"use client";
import { useState, useEffect } from "react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5001";

export interface SiteSettings {
  logo?: {
    url?: string;
    altText?: string;
  };
  favicon?: {
    url?: string;
  };
  headerImages?: Array<{
    url: string;
    altText?: string;
    position?: "top" | "banner" | "background";
    order?: number;
  }>;
  footerContent?: any;
  socialLinks?: Array<{
    platform: string;
    url: string;
    isActive?: boolean;
  }>;
  contactInfo?: {
    email?: string;
    phone?: string;
    address?: string;
    city?: string;
    country?: string;
    postalCode?: string;
    workingHours?: string;
  };
  searchPlaceholder?: string;
  copyrightText?: string;
}

let settingsCache: { [locale: string]: SiteSettings | null } = {};
let cacheTimestamp: { [locale: string]: number } = {};
let pendingRequests: { [locale: string]: Promise<SiteSettings | null> } = {};
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
const FAILED_CACHE_DURATION = 1 * 60 * 1000; // 1 minute for failed requests (404, 429, etc.)
// Suppress rate limit errors in development mode
const SUPPRESS_RATE_LIMIT_ERRORS = process.env.NEXT_PUBLIC_SUPPRESS_RATE_LIMIT_ERRORS === 'true' || process.env.NODE_ENV === 'development';

export const useSiteSettings = (locale: string = "fr"): {
  settings: SiteSettings | null;
  isLoading: boolean;
  error: Error | null;
} => {
  const [settings, setSettings] = useState<SiteSettings | null>(
    settingsCache[locale] !== undefined ? settingsCache[locale] : null
  );
  const [isLoading, setIsLoading] = useState(
    settingsCache[locale] === undefined
  );
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadSettings = async () => {
      // Check cache first - use cached data if valid
      const cached = settingsCache[locale];
      const timestamp = cacheTimestamp[locale];
      const now = Date.now();

      if (cached !== undefined && timestamp && now - timestamp < CACHE_DURATION) {
        setSettings(cached);
        setIsLoading(false);
        return;
      }

      // Check if there's already a pending request for this locale
      if (pendingRequests[locale]) {
        try {
          const result = await pendingRequests[locale];
          setSettings(result);
        } catch (err) {
          // Silently handle error from pending request
        } finally {
          setIsLoading(false);
        }
        return;
      }

      // If we have cached data (even if expired), use it immediately while fetching
      if (cached !== undefined) {
        setSettings(cached);
        setIsLoading(false);
      }

      // Create a new request
      const requestPromise = (async () => {
        try {
          if (cached === undefined) {
            setIsLoading(true);
          }
          
          const response = await fetch(
            `${API_BASE_URL}/api/site-settings/${locale}`
          ).catch((fetchError) => {
            // CORS or network errors - silently handle
            // Use cached data if available, otherwise return null
            return null;
          });

          if (!response || !response.ok) {
            // Handle different error statuses
            if (response?.status === 404) {
              // 404 - endpoint doesn't exist, cache null for shorter duration
              settingsCache[locale] = null;
              cacheTimestamp[locale] = Date.now() - (CACHE_DURATION - FAILED_CACHE_DURATION);
              setSettings(null);
              return null;
            } else if (response?.status === 429) {
              // 429 - Rate limited, use cached data if available, otherwise null
              if (SUPPRESS_RATE_LIMIT_ERRORS) {
                // In dev mode, silently use cached data or null without logging
                if (cached !== undefined) {
                  return cached;
                }
                setSettings(null);
                // Cache for shorter duration to retry sooner
                settingsCache[locale] = null;
                cacheTimestamp[locale] = Date.now() - (CACHE_DURATION - FAILED_CACHE_DURATION);
                return null;
              }
              // Production mode - same behavior but could log if needed
              if (cached !== undefined) {
                return cached;
              }
              setSettings(null);
              // Cache for shorter duration to retry sooner
              settingsCache[locale] = null;
              cacheTimestamp[locale] = Date.now() - (CACHE_DURATION - FAILED_CACHE_DURATION);
              return null;
            } else {
              // Other errors or CORS/network errors - use cached data or null
              if (cached !== undefined) {
                return cached;
              }
              setSettings(null);
              return null;
            }
          }

          const data = await response.json();
          if (data.success && data.data) {
            settingsCache[locale] = data.data;
            cacheTimestamp[locale] = Date.now();
            setSettings(data.data);
            return data.data;
          } else {
            // If response doesn't have expected structure, use cached or null
            if (cached !== undefined) {
              return cached;
            }
            setSettings(null);
            return null;
          }
        } catch (err) {
          // Silently handle all errors (network errors, CORS, timeout, etc.)
          // Use cached data if available, otherwise null
          if (cached !== undefined) {
            return cached;
          }
          setSettings(null);
          return null;
        } finally {
          setIsLoading(false);
          // Remove from pending requests
          delete pendingRequests[locale];
        }
      })();

      // Store the pending request
      pendingRequests[locale] = requestPromise;
      await requestPromise;
    };

    loadSettings();
  }, [locale]);

  return { settings, isLoading, error };
};

// Clear settings cache
export const clearSettingsCache = () => {
  settingsCache = {};
  cacheTimestamp = {};
  pendingRequests = {};
};

