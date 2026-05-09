# Storefront Backend Integration Design

**Date:** 2026-05-04  
**Area:** `chaktech-storefront`  
**Scope:** Fix and stabilize storefront-to-backend integration for the customer-facing Next.js app without widening into a full API-layer rewrite

## Goal

Make the storefront reliably consume the ChakTech backend by correcting broken backend route usage, standardizing server-side backend URL resolution for direct fetches, and preserving the RTK Query integration that already works.

This design intentionally keeps the scope narrow: fix real integration bugs and reduce avoidable duplication without refactoring the entire storefront into a new data-access architecture.

## Scope Decision

### In scope

- correcting broken backend URL/path usage in storefront direct fetch calls,
- keeping `NEXT_PUBLIC_API_BASE_URL` as the backend origin contract,
- introducing a small shared helper for direct server-side backend fetchers,
- updating storefront docs so local and deployed backend wiring is explicit,
- preserving the existing RTK Query slices that already point at the backend correctly.

### Out of scope

- rewriting all storefront data access into RTK Query,
- changing backend API contracts,
- touching the admin panel in this slice,
- redesigning frontend page structure or state management,
- adding a new proxy layer or Next.js rewrite system unless a blocking need appears later.

## Current State Summary

## 1. Backend origin wiring already exists

The storefront already expects a backend origin via `NEXT_PUBLIC_API_BASE_URL`.

Verified current patterns:

- `src/redux/api/apiSlice.js` uses `NEXT_PUBLIC_API_BASE_URL` as `baseUrl`,
- many server-side files directly read `process.env.NEXT_PUBLIC_API_BASE_URL`,
- `ENV_SETUP.md` already documents `NEXT_PUBLIC_API_BASE_URL=http://localhost:5001` for local use,
- `next.config.js` CSP/connect-src already assumes backend traffic goes to port `5001` locally and `api.chaktech.tn` in production.

So the base backend contract is already present; the issue is consistency and path correctness.

## 2. Existing working integration surfaces

Several storefront features already call the backend correctly through root-mounted routes such as:

- `/products/show`
- `/products/slug/:slug`
- `/products/:id`
- `/category/show`
- `/category/all`
- `/blog/all`
- `/blog/slug/:slug`
- `/translations/:locale`
- `/menus/:position/:locale`
- `/settings/:locale`

These are good reference examples because they match the backend’s real route mounting strategy.

## 3. Existing broken integration surfaces

The storefront also has direct fetch calls that incorrectly assume a backend `/api` prefix that does not exist.

Verified broken patterns:

- `src/app/[...slug]/page.js` calls `/api/pages/:slug/:locale`
- `src/app/[...slug]/page.js` calls `/api/content-blocks/:page/:locale`

The backend mounts these routes directly at:

- `/pages/:slug/:locale`
- `/content-blocks/:page/:locale`

So those storefront calls are structurally wrong and will 404 against the real backend.

## 4. Duplication problem

The storefront currently mixes two integration styles:

1. **RTK Query** via `apiSlice.js` and feature slices
2. **Direct server-side fetches** in route/page modules and helper files

The direct fetches repeatedly rebuild backend URLs, which makes path mistakes easier and keeps backend-origin logic duplicated across many files.

## Design Options Considered

### Option 1 — Minimal surgical fix only

Correct the bad `/api/pages` and `/api/content-blocks` usages and leave everything else alone.

**Pros**
- smallest possible diff,
- fastest path to removing the broken behavior.

**Cons**
- leaves duplicated backend-origin logic in place,
- makes future path mistakes likely,
- does not improve clarity for the next server-side fetch caller.

### Option 2 — Correct broken paths + add one shared backend URL helper (recommended)

Fix the broken route usage and introduce one small shared helper that direct server-side fetchers must use to resolve the backend origin.

**Pros**
- fixes the real bugs,
- improves consistency without rewriting data access,
- low risk,
- easy to verify.

**Cons**
- still leaves a mixed architecture (RTK Query + direct fetch),
- does not fully centralize all API access.

### Option 3 — Full storefront API-layer refactor

Move most or all storefront backend access behind one unified API layer.

**Pros**
- cleanest long-term architecture,
- least duplication.

**Cons**
- much larger scope,
- much riskier,
- not aligned with the user’s immediate “link the frontend to the backend” request.

## Recommended Direction

Adopt **Option 2: correct broken paths + add one shared backend URL helper**.

This gives the storefront a stable backend contract quickly without turning the work into a large frontend refactor.

## Integration Architecture

## 1. Keep the existing backend origin contract

Continue to use:

- `NEXT_PUBLIC_API_BASE_URL`

as the canonical backend origin for storefront integration.

This should remain the single deployment-facing configuration value that points the storefront at the backend.

## 2. Introduce one shared backend URL helper

Create a small helper used by direct server-side fetch callers.

Responsibilities:

- read `NEXT_PUBLIC_API_BASE_URL`,
- fail clearly if it is missing,
- normalize trailing slash behavior,
- provide one consistent way to build backend request URLs.

This helper should be used by server-side route/page modules and backend-facing utility code that currently rebuilds the env handling inline.

## 3. Correct the broken path assumptions

Any storefront file calling:

- `/api/pages/...`
- `/api/content-blocks/...`

must be updated to the real backend routes:

- `/pages/...`
- `/content-blocks/...`

No new proxy or rewrite layer should be introduced for this fix.

## 4. Preserve RTK Query where already working

The existing RTK Query slices already point at the backend origin correctly and should not be rewritten in this slice unless a direct bug is discovered.

This keeps risk low and avoids scope creep.

## Files Likely Involved

### Must change

- `chaktech-storefront/src/app/[...slug]/page.js`
- `chaktech-storefront/src/app/page.js`
- `chaktech-storefront/ENV_SETUP.md`

### Likely add

- one small helper under `chaktech-storefront/src/lib/` for backend URL resolution

### May change if direct callers benefit immediately

- `chaktech-storefront/src/lib/load-category.js`
- `chaktech-storefront/src/lib/translations.ts`
- `chaktech-storefront/src/hooks/useMenu.ts`
- `chaktech-storefront/src/hooks/useSiteSettings.js`

These do not need architectural rewrites, only consistent backend-origin usage if touched.

## Success Criteria

This design is successful if implementation produces:

1. no remaining broken `/api/pages/...` or `/api/content-blocks/...` backend calls in the storefront,
2. one shared helper for direct server-side backend URL resolution,
3. no change to the backend contract itself,
4. storefront build still passing,
5. storefront documentation clearly explaining local/backend env setup.

## Verification Strategy

Implementation should verify at least:

- storefront build passes,
- the corrected dynamic page/content fetch paths are present in code,
- no stale `/api/pages` or `/api/content-blocks` backend calls remain,
- the helper is actually used by the corrected server-side callers.

## Non-Goals and Guardrails

- Do not convert the entire storefront to RTK Query.
- Do not change admin panel wiring in this slice.
- Do not change backend route mounts to accommodate bad frontend assumptions.
- Do not add rewrites or proxy layers unless absolutely necessary.
- Prefer the smallest coherent diff that fixes real integration failures and improves future consistency.

## Recommendation Summary

The storefront should keep its current backend origin contract, correct the broken path assumptions, and introduce one shared helper so direct backend fetches stop duplicating URL logic.

That yields a stable, verifiable integration with the current backend while avoiding an unnecessary large refactor.
