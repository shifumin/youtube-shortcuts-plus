# CLAUDE.md

## Project Overview

YouTube Shortcuts Plus — A Chrome extension that adds keyboard shortcuts for YouTube.

**Tech Stack**: TypeScript, [WXT](https://wxt.dev/) (Manifest V3), Vitest, [Biome](https://biomejs.dev/) (linter/formatter)

## Architecture

```
entrypoints/
└── content.ts              # Content script for YouTube pages (keyboard shortcut handling)
utils/
├── keyboard.ts             # Keyboard event helpers (text field detection, modifier keys)
├── keyboard.test.ts        # Unit tests for keyboard
├── videoLoop.ts            # Video loop toggle logic (pure functions)
└── videoLoop.test.ts       # Unit tests for videoLoop
public/icon/                # Extension icons (16–128px)
```

- Path alias: `@/` → project root
- WXT global functions (`defineContentScript`, etc.) do not need to be imported

## Development Commands

```bash
mise exec -- pnpm dev        # Start dev server (hot reload)
mise exec -- pnpm build      # Production build
mise exec -- pnpm compile    # Type check (tsc --noEmit)
mise exec -- pnpm lint       # Lint and format check (Biome)
mise exec -- pnpm lint:fix   # Lint and format with auto-fix
mise exec -- pnpm test       # Run tests (Vitest)
mise exec -- pnpm zip        # Create ZIP for Chrome Web Store
```

## Testing Conventions

- **Framework**: Vitest
- **Location**: Place `*.test.ts` in the same directory as the test target
- **Structure**: Group with `describe`, cover normal cases, error cases, and edge cases
- **Scope**: Only test public functions (private methods are out of scope)

## Code Conventions

- TypeScript strict mode
- Prefer arrow functions
- Naming: camelCase (variables/functions), PascalCase (types), kebab-case (CSS classes)
