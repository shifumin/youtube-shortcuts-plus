# CLAUDE.md

## Project Overview

YouTube Shortcuts Plus — A Chrome extension that adds keyboard shortcuts for YouTube.

**Tech Stack**: TypeScript, [WXT](https://wxt.dev/) (Manifest V3), Vitest, [Biome](https://biomejs.dev/) (linter/formatter)

## Testing

- Co-locate `*.test.ts` with source files, group with `describe`
- Cover normal cases, error cases, and edge cases
- Only test public functions (private methods are out of scope)

## Code Conventions

- TypeScript strict mode
- Prefer arrow functions
- Naming: camelCase (variables/functions), PascalCase (types), kebab-case (CSS classes)
- Semicolons: always, quotes: double, trailing commas: all
- Line width: 100, indent: 2 spaces

## Gotchas

- Test files that need DOM APIs require `// @vitest-environment happy-dom` comment at top
- Content script must use `ctx.setTimeout`/`ctx.addEventListener` (WXT context wrappers) instead of global `window`/`document` for proper cleanup on HMR/navigation
- `wxt prepare` runs on `postinstall` — generates types in `.wxt/`
