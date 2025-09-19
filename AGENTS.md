# Repository Guidelines

## Project Structure & Module Organization
Application code lives under `src/`, organized by Atomic Design: `components/atoms`, `molecules`, `organisms`, `templates`, and `pages`. App Router entries sit in `src/app/`, Zustand slices in `src/stores/slices/`, and selectors in `src/stores/selectors/`. Shared style tokens are in `src/lib/ui/tokens.ts`. Mock data for local development resides in `src/__mocks__/`. Static assets are split between `assets/` (design exports) and `public/` (runtime images and icons). No test suite is currently checked in.

## Build, Test, and Development Commands
Run `npm run dev` for the local Next.js server on port 3000. Use `npm run build` to produce an optimized production bundle, then `npm start` to serve it. Execute `npm run lint` for ESLint verification and `npm run type-check` for strict TypeScript validation. Use `npm run format` before committing large refactors to keep Prettier output consistent.

## Coding Style & Naming Conventions
All components must respect Atomic Design boundaries: higher layers may depend only on lower layers. Never hardcode colors, spacing, or typography—import values from `tokens`. Follow TypeScript strictness, prefer named exports, and keep files client-safe by adding `'use client';` where required. Tailwind utilities are available, but favor tokenized inline styles for shared values. Prettier governs formatting (2-space indentation by default), so let `npm run format` resolve spacing issues.

## Testing Guidelines
Automated tests are temporarily absent. Before merging, run `npm run lint` and `npm run type-check` to prevent regressions. When reintroducing tests, align filenames with the component under test (e.g., `Component.test.tsx`) and colocate inside the relevant feature folder or a dedicated `__tests__` directory.

## Commit & Pull Request Guidelines
Write commits in the imperative mood (e.g., `Add cart selector helpers`) and group related changes per commit. Pull requests should include a concise summary, screenshots for UI updates, references to issue IDs, and notes on any skipped validations. Ensure linting and type checks pass locally before requesting review.
