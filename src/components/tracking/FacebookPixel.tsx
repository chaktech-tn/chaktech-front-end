'use client';

import { useEffect } from 'react';

/**
 * Facebook Pixel Component
 * Initializes Meta Pixel for browser-side tracking
 */
export default function FacebookPixel() {
  useEffect(() => {
    // Only run on client-side
    if (typeof window === 'undefined') {
      return;
    }

    const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;

    // Don't initialize if pixel ID is not provided (silently skip)
    if (!pixelId) {
      return;
    }

    // Check if pixel is already initialized
    if ((window as any).fbq) {
      return;
    }

    // Initialize Meta Pixel
    (function (f: any, b: any, e: string, v: string, n?: any, t?: any, s?: any) {
      if (f.fbq) return;
      n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = !0;
      n.version = '2.0';
      n.queue = [];
      t = b.createElement(e);
      t.async = !0;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode?.insertBefore(t, s);
    })(
      window,
      document,
      'script',
      `https://connect.facebook.net/en_US/fbevents.js`
    );

    // Initialize pixel with ID
    (window as any).fbq('init', pixelId);
    
    // Track pageview
    (window as any).fbq('track', 'PageView');

    // Cleanup function (optional, but good practice)
    return () => {
      // Pixel script persists, but we can add cleanup if needed
    };
  }, []);

  // This component doesn't render anything
  return null;
}

/**
 * Track a custom event with Meta Pixel
 * @param eventName - Event name (e.g., 'Purchase', 'AddToCart')
 * @param eventData - Event data object
 */
export function trackMetaPixelEvent(eventName: string, eventData?: Record<string, any>) {
  if (typeof window === 'undefined' || !(window as any).fbq) {
    // Silently skip if Meta Pixel is not initialized
    return;
  }

  try {
    (window as any).fbq('track', eventName, eventData || {});
  } catch (error) {
    console.error('Meta Pixel: Error tracking event', error);
  }
}

