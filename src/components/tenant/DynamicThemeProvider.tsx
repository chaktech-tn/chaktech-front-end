"use client";

import React, { useEffect } from 'react';

type Branding = {
  primaryColor?: string;
  secondaryColor?: string;
  accentColor?: string;
  logoUrl?: string;
  faviconUrl?: string;
  siteName?: string;
};

type Props = {
  branding?: Branding | null;
  children: React.ReactNode;
};

export default function DynamicThemeProvider({ branding, children }: Props) {
  useEffect(() => {
    if (!branding) {
      return;
    }

    const styles = document.documentElement.style;
    if (branding.primaryColor) styles.setProperty('--primary-color', branding.primaryColor);
    if (branding.secondaryColor) styles.setProperty('--secondary-color', branding.secondaryColor);
    if (branding.accentColor) styles.setProperty('--accent-color', branding.accentColor);
    if (branding.logoUrl) styles.setProperty('--logo-url', `url(${branding.logoUrl})`);
    if (branding.faviconUrl) styles.setProperty('--favicon-url', `url(${branding.faviconUrl})`);
    if (branding.siteName) styles.setProperty('--site-name', branding.siteName);
    if (branding.primaryColor) styles.setProperty('--tp-theme-2', branding.primaryColor);
    if (branding.secondaryColor) styles.setProperty('--tp-theme-1', branding.secondaryColor);
    if (branding.accentColor) styles.setProperty('--tp-theme-3', branding.accentColor);
    if (branding.primaryColor) styles.setProperty('--st-primary', branding.primaryColor);
  }, [branding]);

  return <>{children}</>;
}
