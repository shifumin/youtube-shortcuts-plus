# YouTube Shortcuts Plus

A Chrome extension that adds keyboard shortcuts for YouTube.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/shifumin/youtube-shortcuts-plus.git
   cd youtube-shortcuts-plus
   ```
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Build the extension:
   ```bash
   pnpm build
   ```
4. Open `chrome://extensions/` in Chrome
5. Enable **Developer mode** (toggle in the top right)
6. Click **Load unpacked** and select the `.output/chrome-mv3` directory

## Features

| Shortcut | Action | Feedback |
|----------|--------|----------|
| `R` | Toggle video loop (repeat) | Toast: "Loop: ON" / "Loop: OFF" |
| `G` | Capture frame with Gyazo | Gyazo extension handles UI |

- Only active on YouTube pages
- Disabled when typing in text fields (search bar, comments, etc.)
- Disabled when modifier keys (Ctrl, Alt, Shift, Cmd) are held
- `G` key requires the [Gyazo Chrome extension](https://chromewebstore.google.com/detail/gyazo-share-new-screensho/ffdaeeijbbijklfcpahbghahojgfgebo) to be installed
- Each shortcut can be individually enabled/disabled from the extension popup (click the extension icon)

## Tech Stack

- TypeScript
- [WXT](https://wxt.dev/) (Manifest V3)
- [Vitest](https://vitest.dev/)
- [Biome](https://biomejs.dev/)
