"use client";
import { useState, useEffect } from "react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
if (!API_BASE_URL) {
  throw new Error("NEXT_PUBLIC_API_BASE_URL environment variable is not set");
}

let settingsCache = {};
let cacheTimestamp = {};
let pendingRequests = {};
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
const FAILED_CACHE_DURATION = 1 * 60 * 1000; // 1 minute for failed requests (404, 429, etc.)
// Suppress rate limit errors in development mode
const SUPPRESS_RATE_LIMIT_ERRORS = process.env.NEXT_PUBLIC_SUPPRESS_RATE_LIMIT_ERRORS === 'true' || process.env.NODE_ENV === 'development';

export const useSiteSettings = (locale = "fr") => {
  const [settings, setSettings] = useState(
    settingsCache[locale] !== undefined ? settingsCache[locale] : null
  );
  const [isLoading, setIsLoading] = useState(
    settingsCache[locale] === undefined
  );
  const [error] = useState(null);

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
      if (locale in pendingRequests) {
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
            `${API_BASE_URL}/settings/${locale}`
          ).catch(() => {
            // CORS or network errors - silently handle
            // Use cached data if available, otherwise return null to use empty settings
            return null;
          });

          if (!response || !response.ok) {
            // Handle different error statuses
            if (response?.status === 404) {
              // 404 - endpoint doesn't exist, cache empty settings for shorter duration
              const emptySettings = {};
              settingsCache[locale] = emptySettings;
              cacheTimestamp[locale] = Date.now() - (CACHE_DURATION - FAILED_CACHE_DURATION);
              setSettings(emptySettings);
              return emptySettings;
            } else if (response?.status === 429) {
              // 429 - Rate limited, use cached data if available, otherwise empty settings
              if (SUPPRESS_RATE_LIMIT_ERRORS) {
                // In dev mode, silently use cached data or empty settings without logging
                if (cached !== undefined) {
                  return cached;
                }
                const emptySettings = {};
                setSettings(emptySettings);
                // Cache for shorter duration to retry sooner
                settingsCache[locale] = emptySettings;
                cacheTimestamp[locale] = Date.now() - (CACHE_DURATION - FAILED_CACHE_DURATION);
                return emptySettings;
              }
              // Production mode - same behavior but could log if needed
              if (cached !== undefined) {
                return cached;
              }
              const emptySettings = {};
              setSettings(emptySettings);
              // Cache for shorter duration to retry sooner
              settingsCache[locale] = emptySettings;
              cacheTimestamp[locale] = Date.now() - (CACHE_DURATION - FAILED_CACHE_DURATION);
              return emptySettings;
            } else {
              // Other errors or CORS/network errors - use cached data or empty settings
              if (cached !== undefined) {
                return cached;
              }
              const emptySettings = {};
              setSettings(emptySettings);
              return emptySettings;
            }
          }

          const data = await response.json();
          if (data.success && data.data) {
            settingsCache[locale] = data.data;
            cacheTimestamp[locale] = Date.now();
            setSettings(data.data);
            return data.data;
          } else {
            // If response doesn't have expected structure, use cached or empty settings
            if (cached !== undefined) {
              return cached;
            }
            const emptySettings = {};
            setSettings(emptySettings);
            return emptySettings;
          }
        } catch (err) {
          // Silently handle all errors (network errors, CORS, timeout, etc.)
          // Use cached data if available, otherwise empty settings
          if (cached !== undefined) {
            return cached;
          }
          const emptySettings = {};
          setSettings(emptySettings);
          return emptySettings;
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
export const clearSiteSettingsCache = () => {
  settingsCache = {};
  cacheTimestamp = {};
  pendingRequests = {};
};

// Default export for compatibility
export default useSiteSettings;
