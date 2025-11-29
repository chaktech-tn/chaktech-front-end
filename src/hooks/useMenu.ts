"use client";
import { useState, useEffect } from "react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5001";

export interface MenuItem {
  label: string;
  url: string;
  type: "internal" | "external" | "mega" | "category" | "page";
  icon?: string;
  image?: string;
  description?: string;
  children?: MenuItem[];
  order?: number;
  isActive?: boolean;
  openInNewTab?: boolean;
  megaMenuConfig?: {
    columns?: number;
    layout?: "grid" | "list" | "mixed";
  };
}

export interface Menu {
  _id?: string;
  name: string;
  items: MenuItem[];
  locale: string;
  position: "header" | "footer" | "sidebar" | "mobile";
  isActive?: boolean;
}

let menuCache: { [key: string]: Menu } = {};
let cacheTimestamp: { [key: string]: number } = {};
let pendingRequests: { [key: string]: Promise<Menu | null> } = {};
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
const FAILED_CACHE_DURATION = 1 * 60 * 1000; // 1 minute for failed requests (404, 429, etc.)
// Suppress rate limit errors in development mode
const SUPPRESS_RATE_LIMIT_ERRORS = process.env.NEXT_PUBLIC_SUPPRESS_RATE_LIMIT_ERRORS === 'true' || process.env.NODE_ENV === 'development';

export const useMenu = (
  position: "header" | "footer" | "sidebar" | "mobile",
  locale: string = "fr"
): {
  menu: Menu | null;
  isLoading: boolean;
  error: Error | null;
} => {
  const cacheKey = `${position}-${locale}`;
  const [menu, setMenu] = useState<Menu | null>(menuCache[cacheKey] || null);
  const [isLoading, setIsLoading] = useState(!menuCache[cacheKey]);
  const [error] = useState<Error | null>(null);

  useEffect(() => {
    const loadMenu = async () => {
      // Check cache first - use cached data if valid
      const cached = menuCache[cacheKey];
      const timestamp = cacheTimestamp[cacheKey];
      const now = Date.now();

      if (cached && timestamp && now - timestamp < CACHE_DURATION) {
        setMenu(cached);
        setIsLoading(false);
        return;
      }

      // Check if there's already a pending request for this key
      if (pendingRequests[cacheKey]) {
        try {
          const result = await pendingRequests[cacheKey];
          if (result) {
            setMenu(result);
          }
        } catch (err) {
          // Silently handle error from pending request
        } finally {
          setIsLoading(false);
        }
        return;
      }

      // If we have cached data (even if expired), use it immediately while fetching
      if (cached) {
        setMenu(cached);
        setIsLoading(false);
      }

      // Create a new request
      const requestPromise = (async () => {
        try {
          if (!cached) {
            setIsLoading(true);
          }

          const response = await fetch(
            `${API_BASE_URL}/menus/${position}/${locale}`
          ).catch(() => {
            // CORS or network errors - silently handle
            // Use cached data if available, otherwise return null to use empty menu
            return null;
          });

          if (!response || !response.ok) {
            // Handle different error statuses
            if (response?.status === 404) {
              // 404 - endpoint doesn't exist, cache empty menu for shorter duration
              const emptyMenu: Menu = {
                name: `${position} Menu`,
                items: [],
                locale,
                position,
                isActive: true,
              };
              menuCache[cacheKey] = emptyMenu;
              cacheTimestamp[cacheKey] = Date.now() - (CACHE_DURATION - FAILED_CACHE_DURATION);
              setMenu(emptyMenu);
              return emptyMenu;
            } else if (response?.status === 429) {
              // 429 - Rate limited, use cached data if available, otherwise empty menu
              if (SUPPRESS_RATE_LIMIT_ERRORS) {
                // In dev mode, silently use cached data or empty menu without logging
                if (cached) {
                  return cached;
                }
                const emptyMenu: Menu = {
                  name: `${position} Menu`,
                  items: [],
                  locale,
                  position,
                  isActive: true,
                };
                setMenu(emptyMenu);
                // Cache for shorter duration to retry sooner
                menuCache[cacheKey] = emptyMenu;
                cacheTimestamp[cacheKey] = Date.now() - (CACHE_DURATION - FAILED_CACHE_DURATION);
                return emptyMenu;
              }
              // Production mode - same behavior but could log if needed
              if (cached) {
                return cached;
              }
              const emptyMenu: Menu = {
                name: `${position} Menu`,
                items: [],
                locale,
                position,
                isActive: true,
              };
              setMenu(emptyMenu);
              // Cache for shorter duration to retry sooner
              menuCache[cacheKey] = emptyMenu;
              cacheTimestamp[cacheKey] = Date.now() - (CACHE_DURATION - FAILED_CACHE_DURATION);
              return emptyMenu;
            } else {
              // Other errors or CORS/network errors - use cached data or empty menu
              if (cached) {
                return cached;
              }
              const emptyMenu: Menu = {
                name: `${position} Menu`,
                items: [],
                locale,
                position,
                isActive: true,
              };
              setMenu(emptyMenu);
              return emptyMenu;
            }
          }

          const data = await response.json();
          if (data.success && data.data) {
            menuCache[cacheKey] = data.data;
            cacheTimestamp[cacheKey] = Date.now();
            setMenu(data.data);
            return data.data;
          } else {
            // If response doesn't have expected structure, use cached or empty menu
            if (cached) {
              return cached;
            }
            const emptyMenu: Menu = {
              name: `${position} Menu`,
              items: [],
              locale,
              position,
              isActive: true,
            };
            setMenu(emptyMenu);
            return emptyMenu;
          }
        } catch (err) {
          // Silently handle all errors (network errors, CORS, timeout, etc.)
          // Use cached data if available, otherwise empty menu
          if (cached) {
            return cached;
          }
          const emptyMenu: Menu = {
            name: `${position} Menu`,
            items: [],
            locale,
            position,
            isActive: true,
          };
          setMenu(emptyMenu);
          return emptyMenu;
        } finally {
          setIsLoading(false);
          // Remove from pending requests
          delete pendingRequests[cacheKey];
        }
      })();

      // Store the pending request
      pendingRequests[cacheKey] = requestPromise;
      await requestPromise;
    };

    loadMenu();
  }, [position, locale, cacheKey]);

  return { menu, isLoading, error };
};

// Clear menu cache
export const clearMenuCache = () => {
  menuCache = {};
  cacheTimestamp = {};
  pendingRequests = {};
};

