const path = require("path");
const createNextIntlPlugin = require("next-intl/plugin");
const withNextIntl = createNextIntlPlugin("./src/i18n/request.js");

const isDev = process.env.NODE_ENV === "development";
const localDevHosts = [
  "localhost",
  "127.0.0.1",
  "100.97.72.116",
  "192.168.10.27",
  "192.168.10.36",
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Performance optimizations
  compress: true,
  poweredByHeader: false,
  // Allow cross-origin requests in development
  allowedDevOrigins: isDev ? localDevHosts : [],
  // Image optimization
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // Increase timeout for external images
    unoptimized: false,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ibb.co",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.s3.*.amazonaws.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "s3.amazonaws.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i0.wp.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "chaktech.tn",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "5001",
        pathname: "/uploads/products/**",
      },
    ],
  },
  // Headers for caching and security
  async headers() {
    const connectSrc = [
      "'self'",
      "http://localhost:5001",
      "http://192.168.10.27:5001",
      "http://192.168.10.36:5001",
      "http://100.97.72.116:5001",
      "https://us.i.posthog.com",
      "https://*.posthog.com",
      "https://us-assets.i.posthog.com",
      "https://api.chaktech.tn",
    ];

    if (isDev) {
      connectSrc.push(
        "https://www.react-grab.com",
        "ws://localhost:3001",
        "ws://127.0.0.1:3001",
        "ws://100.97.72.116:3001",
        "ws://192.168.10.27:3001",
        "ws://192.168.10.36:3001"
      );
    }

    const securityHeaders = [
      {
        key: "X-DNS-Prefetch-Control",
        value: "on",
      },
      {
        key: "Strict-Transport-Security",
        value: "max-age=63072000; includeSubDomains; preload",
      },
      {
        key: "X-Frame-Options",
        value: "SAMEORIGIN",
      },
      {
        key: "X-Content-Type-Options",
        value: "nosniff",
      },
      {
        key: "X-XSS-Protection",
        value: "1; mode=block",
      },
      {
        key: "Referrer-Policy",
        value: "origin-when-cross-origin",
      },
      {
        key: "Permissions-Policy",
        value: "camera=(), microphone=(), geolocation=()",
      },
      {
        key: "Content-Security-Policy",
        value: [
          "default-src 'self'",
          [
            "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://us.i.posthog.com https://us-assets.i.posthog.com",
            isDev ? "https://unpkg.com" : "",
          ].filter(Boolean).join(' '),
          [
            "style-src 'self' 'unsafe-inline'",
            isDev ? "https://fonts.googleapis.com" : "",
          ].filter(Boolean).join(' '),
          "img-src 'self' data: https: blob: http:",
          [
            "font-src 'self' data:",
            isDev ? "https://fonts.gstatic.com" : "",
          ].filter(Boolean).join(' '),
          `connect-src ${connectSrc.join(' ')}`,
          "frame-src 'self'",
          "object-src 'none'",
          "base-uri 'self'",
          "form-action 'self'",
          "frame-ancestors 'self'",
          // Only upgrade to HTTPS in production (not on local network)
          ...(process.env.NODE_ENV === "production" && process.env.NEXT_PUBLIC_FORCE_HTTPS !== "false"
            ? ["upgrade-insecure-requests"]
            : []),
        ].join("; "),
      },
    ];

    if (!isDev) {
      securityHeaders.splice(4, 0, {
        key: "Cross-Origin-Opener-Policy",
        value: "same-origin",
      });
    }

    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
      {
        source: "/assets/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/_next/image/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
  // Experimental features for better performance
experimental: {
    optimizeCss: true,
    sassOptions: {
      quietDeps: true,
    },
  },
  transpilePackages: ["swiper"],
};

module.exports = withNextIntl(nextConfig);
