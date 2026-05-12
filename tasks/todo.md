- [x] Review Phase 6 storefront native cutover audit and the identified storefront contract files.
- [ ] Confirm the smallest safe validation target and get approval on the approach.
- [ ] Add failing focused tests for backend URL and order API contract assumptions.
- [ ] Make the minimal repo-local code changes required by those tests, if any.
- [ ] Run the smallest relevant test command(s) and capture exact results.
- [ ] Summarize changed files and verification notes.

## Review notes

- Source audit doc lives at `../docs/superpowers/storefront-native-cutover-audit-2026-05-11-phase6.md` from the monorepo root.
- Preferred scope is repo-local storefront validation coverage around `src/lib/backend-url.js`, `src/redux/features/order/orderApi.js`, `src/redux/features/orderApi.js`, and `src/redux/features/cartSlice.js`.
- Avoid backend/admin/UI changes unless a focused failing test proves a storefront contract bug.
