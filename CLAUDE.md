# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm install` — install dependencies
- `npm run dev` — start the Vite dev server with HMR
- `npm run build` — type-check (`tsc -b`) then produce a production build in `dist/`
- `npm run preview` — serve the production build locally
- `npm run lint` — run Oxlint (config: `.oxlintrc.json`)

There is no test setup yet.

## Architecture

This is a single-page React + TypeScript to-do app scaffolded with Vite. There is no backend — all state lives in the browser.

- `src/hooks/useTodos.ts` is the single source of truth for to-do state. It initializes from `localStorage` (key `todo-app:todos`) and writes back to it on every change via a `useEffect`. All mutations (add/toggle/remove/clear completed) go through this hook rather than touching `localStorage` directly elsewhere.
- `src/App.tsx` is the only component; it renders the input form and list, reading/mutating state exclusively through `useTodos()`.
- `src/types.ts` defines the `Todo` shape (`id`, `text`, `done`, `createdAt`) shared between the hook and the component.

When adding features that need to persist, extend `useTodos` (or the `Todo` type) rather than introducing a second persistence path.

## Feature development workflow

Before implementing a new feature (not small fixes), use the `design-doc-first` skill (`.claude/skills/design-doc-first/`) to write a short design doc to `docs/design/` first, then implement.

## Explaining code

When writing or changing code in this repo, explain what the code does in Korean, simply enough for an elementary school student to understand — avoid technical jargon, or define it in plain terms when unavoidable.
