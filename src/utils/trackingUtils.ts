/**
 * Tracking Utilities
 * Helper functions for Meta Pixel and tracking event management
 */

/**
 * Generate a unique event ID (UUID v4) for event deduplication
 * Uses crypto.randomUUID if available, otherwise falls back to a custom implementation
 * @returns {string} UUID v4 string
 */
export function generateEventId(): string {
  // Use browser's crypto.randomUUID if available (modern browsers)
  if (typeof window !== 'undefined' && window.crypto && window.crypto.randomUUID) {
    return window.crypto.randomUUID();
  }
  
  // Fallback implementation for older browsers
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * Extract Meta Pixel cookies (_fbp and _fbc) from browser
 * @returns {Object} Object with fbp and fbc cookie values
 */
export function getMetaCookies(): { fbp: string | null; fbc: string | null } {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return { fbp: null, fbc: null };
  }

  // Helper function to get cookie value
  const getCookie = (name: string): string | null => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop()?.split(';').shift() || null;
    }
    return null;
  };

  return {
    fbp: getCookie('_fbp'),
    fbc: getCookie('_fbc'),
  };
}

/**
 * Get client information (user agent, etc.)
 * @returns {Object} Client information object
 */
export function getClientInfo(): { userAgent: string } {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return { userAgent: '' };
  }

  return {
    userAgent: navigator.userAgent || '',
  };
}

