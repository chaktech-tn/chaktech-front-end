# Storefront Backend Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix the storefront so it consistently resolves the backend origin and stops calling non-existent `/api/pages/...` and `/api/content-blocks/...` backend paths.

**Architecture:** Keep the existing `NEXT_PUBLIC_API_BASE_URL` contract and the working RTK Query setup, but introduce one tiny shared helper for direct backend URL construction. Use that helper in the two broken server-side page entrypoints so they target the backend’s real root-mounted `/pages/...` and `/content-blocks/...` routes without widening into a full data-layer rewrite.

**Tech Stack:** Next.js App Router, plain JavaScript, Jest, fetch, RTK Query

---

## File Structure

**Create**
- `src/lib/backend-url.js` - shared helper for backend base URL resolution and safe route joining.
- `__tests__/backend-url.test.js` - regression tests for backend URL normalization and path joining.

**Modify**
- `src/app/[...slug]/page.js` - replace broken `/api/pages/...` and `/api/content-blocks/...` fetches with helper-backed real backend paths.
- `src/app/page.js` - replace inline backend-origin helper with shared helper and keep homepage routes on real backend paths.
- `ENV_SETUP.md` - document the backend origin contract and mention that backend routes are root-mounted, not `/api`-prefixed.

**Inspect**
- `src/redux/api/apiSlice.js` - preserve the existing RTK Query base URL contract.
- `next.config.js` - preserve current CSP strategy; do not widen scope into CSP refactors in this slice.
- `src/lib/load-category.js` - optional follow-up candidate only if the helper can be reused without scope creep.
- `src/lib/translations.ts` - optional follow-up candidate only if the helper can be reused without scope creep.

---

### Task 1: Lock backend URL construction with a failing helper test

**Files:**
- Create: `src/lib/backend-url.js`
- Create: `__tests__/backend-url.test.js`

- [ ] **Step 1: Write the failing backend URL helper test**

```js
describe("backend URL helper", () => {
  const ORIGINAL_ENV = process.env.NEXT_PUBLIC_API_BASE_URL;

  afterEach(() => {
    if (ORIGINAL_ENV === undefined) {
      delete process.env.NEXT_PUBLIC_API_BASE_URL;
    } else {
      process.env.NEXT_PUBLIC_API_BASE_URL = ORIGINAL_ENV;
    }
    jest.resetModules();
  });

  test("buildBackendUrl joins root-mounted backend paths without duplicate slashes", async () => {
    process.env.NEXT_PUBLIC_API_BASE_URL = "http://localhost:5001/";
    const { buildBackendUrl } = await import("../src/lib/backend-url.js");

    expect(buildBackendUrl("/pages/homepage/fr")).toBe(
      "http://localhost:5001/pages/homepage/fr"
    );
    expect(buildBackendUrl("content-blocks/homepage/fr")).toBe(
      "http://localhost:5001/content-blocks/homepage/fr"
    );
  });

  test("getBackendBaseUrl throws when NEXT_PUBLIC_API_BASE_URL is missing", async () => {
    delete process.env.NEXT_PUBLIC_API_BASE_URL;
    const { getBackendBaseUrl } = await import("../src/lib/backend-url.js");

    expect(() => getBackendBaseUrl()).toThrow(
      "NEXT_PUBLIC_API_BASE_URL environment variable is not set"
    );
  });
});
```

- [ ] **Step 2: Run the helper test to verify it fails**

Run: `pnpm exec jest --runInBand __tests__/backend-url.test.js`
Expected: FAIL because `src/lib/backend-url.js` does not exist yet.

- [ ] **Step 3: Implement the minimal shared backend URL helper**

```js
export function getBackendBaseUrl() {
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!apiUrl) {
    throw new Error("NEXT_PUBLIC_API_BASE_URL environment variable is not set");
  }
  return apiUrl.replace(/\/$/, "");
}

export function buildBackendUrl(pathname) {
  const normalizedPath = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${getBackendBaseUrl()}${normalizedPath}`;
}
```

- [ ] **Step 4: Re-run the helper test until green**

Run: `pnpm exec jest --runInBand __tests__/backend-url.test.js`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/lib/backend-url.js __tests__/backend-url.test.js
git commit -m "Add storefront backend url helper"
```

---

### Task 2: Fix dynamic page backend fetches to use real mounted routes

**Files:**
- Modify: `src/app/[...slug]/page.js`
- Test: `__tests__/backend-url.test.js`

- [ ] **Step 1: Extend the failing helper test to lock the broken route paths**

```js
test("buildBackendUrl preserves root-mounted CMS paths without /api prefix", async () => {
  process.env.NEXT_PUBLIC_API_BASE_URL = "http://localhost:5001";
  const { buildBackendUrl } = await import("../src/lib/backend-url.js");

  expect(buildBackendUrl("/pages/about/fr")).toBe("http://localhost:5001/pages/about/fr");
  expect(buildBackendUrl("/content-blocks/about/fr")).toBe(
    "http://localhost:5001/content-blocks/about/fr"
  );
  expect(buildBackendUrl("/api/pages/about/fr")).toBe("http://localhost:5001/api/pages/about/fr");
});
```

This test stays neutral about the old bad path but gives you a safe helper contract for the real routes.

- [ ] **Step 2: Run the targeted storefront build expectation in your head, then change only the broken call sites**

Update:

```js
`${API_BASE_URL}/api/pages/${slug}/${locale}`
```

to:

```js
buildBackendUrl(`/pages/${slug}/${locale}`)
```

and update:

```js
`${API_BASE_URL}/api/content-blocks/${page.slug}/${locale}`
```

to:

```js
buildBackendUrl(`/content-blocks/${page.slug}/${locale}`)
```

Also remove the local inline `getApiBaseUrl()` helper and import the shared helper instead.

- [ ] **Step 3: Run the helper test again to confirm the URL contract still passes**

Run: `pnpm exec jest --runInBand __tests__/backend-url.test.js`
Expected: PASS

- [ ] **Step 4: Commit**

```bash
git add src/app/[...slug]/page.js __tests__/backend-url.test.js
git commit -m "Fix storefront cms backend paths"
```

---

### Task 3: Normalize homepage backend fetches through the shared helper

**Files:**
- Modify: `src/app/page.js`
- Test: `__tests__/backend-url.test.js`

- [ ] **Step 1: Extend the helper test with the homepage routes the storefront depends on**

```js
test("buildBackendUrl supports homepage content and SEO routes", async () => {
  process.env.NEXT_PUBLIC_API_BASE_URL = "http://localhost:5001";
  const { buildBackendUrl } = await import("../src/lib/backend-url.js");

  expect(buildBackendUrl("/content-blocks/homepage/fr")).toBe(
    "http://localhost:5001/content-blocks/homepage/fr"
  );
  expect(buildBackendUrl("/pages/homepage/fr")).toBe(
    "http://localhost:5001/pages/homepage/fr"
  );
});
```

- [ ] **Step 2: Replace the inline homepage `getApiBaseUrl()` helper with the shared helper**

Use:

```js
import { buildBackendUrl } from "@/lib/backend-url";
```

Then convert the homepage fetch calls to:

```js
fetch(buildBackendUrl(`/content-blocks/homepage/${locale}`), { next: { revalidate: 60 } })
fetch(buildBackendUrl(`/pages/homepage/${locale}`), { next: { revalidate: 300 } })
```

- [ ] **Step 3: Re-run the helper test to keep the backend path contract green**

Run: `pnpm exec jest --runInBand __tests__/backend-url.test.js`
Expected: PASS

- [ ] **Step 4: Commit**

```bash
git add src/app/page.js __tests__/backend-url.test.js
git commit -m "Use shared backend url helper on homepage"
```

---

### Task 4: Update storefront environment docs for the corrected backend contract

**Files:**
- Modify: `ENV_SETUP.md`

- [ ] **Step 1: Add the failing expectation in prose first**

Write a note in the docs draft that frontend developers must call backend routes at root-mounted paths like `/pages/...` and `/content-blocks/...`, not `/api/pages/...`.

- [ ] **Step 2: Update the environment doc with the corrected contract**

Add a short section like:

```md
## Backend route note

The ChakTech backend mounts routes directly at the API root.

Examples:

- `GET ${NEXT_PUBLIC_API_BASE_URL}/pages/:slug/:locale`
- `GET ${NEXT_PUBLIC_API_BASE_URL}/content-blocks/:page/:locale`

Do **not** prefix these backend routes with `/api/` in storefront fetch calls.
```

- [ ] **Step 3: Commit**

```bash
git add ENV_SETUP.md
git commit -m "Document storefront backend route contract"
```

---

### Task 5: Verify the storefront integration slice

**Files:**
- Test: `__tests__/backend-url.test.js`
- Modify/Verify: `src/app/[...slug]/page.js`
- Modify/Verify: `src/app/page.js`
- Modify/Verify: `src/lib/backend-url.js`
- Modify/Verify: `ENV_SETUP.md`

- [ ] **Step 1: Run the focused helper regression test**

Run: `pnpm exec jest --runInBand __tests__/backend-url.test.js`
Expected: PASS

- [ ] **Step 2: Check that no broken backend calls remain for the corrected CMS surfaces**

Run: `grep -R "\/api\/pages\|\/api\/content-blocks" src/app src/lib src/hooks`
Expected: no matches in the corrected storefront CMS callers, or only matches in comments/docs if any.

- [ ] **Step 3: Run the storefront production build**

Run: `pnpm build`
Expected: PASS

- [ ] **Step 4: Commit**

```bash
git add src/app/[...slug]/page.js src/app/page.js src/lib/backend-url.js __tests__/backend-url.test.js ENV_SETUP.md
git commit -m "Fix storefront backend integration"
```

---

## Self-Review

### Spec coverage

This plan covers all approved implementation targets from `docs/superpowers/specs/2026-05-04-storefront-backend-integration-design.md`:

- correction of broken `/api/pages` and `/api/content-blocks` calls,
- preservation of `NEXT_PUBLIC_API_BASE_URL` as the backend origin contract,
- one shared helper for direct server-side backend URL resolution,
- no backend contract changes,
- no admin panel scope expansion,
- storefront build verification.

### Placeholder scan

No `TBD`, `TODO`, or vague “fix later” instructions remain. Every task names exact files, concrete route strings, and verification commands.

### Type/contract consistency

The plan consistently refers to:

- the real backend root-mounted paths (`/pages/...`, `/content-blocks/...`),
- `NEXT_PUBLIC_API_BASE_URL` as the single backend origin contract,
- `src/lib/backend-url.js` as the shared helper,
- `__tests__/backend-url.test.js` as the regression guard.

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-05-04-storefront-backend-integration.md`. Two execution options:

**1. Subagent-Driven (recommended)** - I dispatch a fresh subagent per task, review between tasks, fast iteration

**2. Inline Execution** - Execute tasks in this session using executing-plans, batch execution with checkpoints

Which approach?
