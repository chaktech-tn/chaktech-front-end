# ChakTech Storefront
**Parent:** ../AGENTS.md

## STACK
Next.js, TypeScript/TSX, Redux Toolkit, SCSS, next-intl

## RUN
```bash
pnpm dev      # dev server (port 3000)
pnpm build    # production build
```

## KEY FILES
| Path | Purpose |
|------|---------|
| `pages/` | Next.js pages |
| `src/components/` | React components |
| `src/hooks/` | Custom hooks |
| `src/redux/` | Redux store |
| `public/assets/scss/` | SCSS styles |

## ANTI-PATTERNS
- All new files must be .tsx (not .jsx)
- Styles go in `scss/`, not CSS
