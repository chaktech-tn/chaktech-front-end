# ChakTech Storefront
**Parent:** ../AGENTS.md

## STACK
Next 16 App Router, React 19, JavaScript + SCSS, Redux Toolkit, next-intl

## RUN
```bash
pnpm dev      # dev server (port 3001)
pnpm build
pnpm start    # production server (port 3001)
pnpm test
pnpm lint
```

## KEY PATHS
- `src/app/` - App Router pages, route handlers, metadata, error boundaries
- `src/lib/backend-url.js` - required backend base URL helper
- `src/app/api/locale/route.js` - locale cookie endpoint
- `src/components/` - storefront UI
- `public/assets/scss/` and `src/app/globals.scss` - styling entrypoints

## NOTES
- This app uses `src/app/`, not `pages/`.
- `NEXT_PUBLIC_API_BASE_URL` is required; `buildBackendUrl()` throws if it is missing.
- Storefront fetches backend routes directly (`/pages/...`, `/content-blocks/...`, `/menus/...`) without a frontend `/api` prefix.
- Match neighboring file extensions in `src/app/`; the current router files are `.js`.

## ANTI-PATTERNS
- Do NOT force new App Router files to `.tsx` when the surrounding route is `.js`.
- Keep styles in the existing SCSS pipeline unless the repo is deliberately migrated.
- Do NOT delete failing tests.
