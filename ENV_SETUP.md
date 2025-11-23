# Frontend Environment Setup

## Create `.env.local` file in `chaktech-front-end/` directory

Copy and paste this content:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:5001
NEXT_PUBLIC_CURRENCY=TND
NEXT_PUBLIC_APP_NAME=ChakTech Store
NEXT_PUBLIC_DEFAULT_LOCALE=fr
NEXT_PUBLIC_SUPPORTED_LOCALES=fr,ar,en

# PostHog Analytics Configuration
NEXT_PUBLIC_POSTHOG_KEY=phc_O7Elvay72joeVrzDFKW3tviJk5sJucRL0IYd0WGQoA7
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com

# Meta Pixel Configuration (for hybrid tracking)
NEXT_PUBLIC_META_PIXEL_ID=your_meta_pixel_id

# Development Mode - Suppress Rate Limit Errors
# Set to 'true' to suppress 429 (Too Many Requests) errors in console during development
# Defaults to true in development mode (NODE_ENV=development)
NEXT_PUBLIC_SUPPRESS_RATE_LIMIT_ERRORS=true
```

## Required Variables

- `NEXT_PUBLIC_API_BASE_URL` - Must match backend URL (<http://localhost:5001>)

## Optional Variables

### PostHog Analytics

- `NEXT_PUBLIC_POSTHOG_KEY` - PostHog project API key (required for analytics). Get this from your PostHog project settings.
- `NEXT_PUBLIC_POSTHOG_HOST` - PostHog host URL (optional, defaults to <https://app.posthog.com>). Only change if you're using a self-hosted PostHog instance.

### Meta Pixel & Conversions API

- `NEXT_PUBLIC_META_PIXEL_ID` - Your Meta Pixel ID (required for hybrid tracking). Get this from Meta Events Manager. Must match the `META_PIXEL_ID` in your backend `.env` file.

### Development & Error Handling

- `NEXT_PUBLIC_SUPPRESS_RATE_LIMIT_ERRORS` - Set to `'true'` to suppress 429 (Too Many Requests) errors in the console during development. Defaults to `true` automatically when `NODE_ENV=development`. Set to `'false'` to see all rate limit errors even in development mode.
