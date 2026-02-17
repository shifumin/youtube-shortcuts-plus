import type { WxtStorageItem } from "wxt/utils/storage";
import { storage } from "wxt/utils/storage";

export type ShortcutId = "loopToggle" | "gyazoCapture";

export type ShortcutSettings = Record<ShortcutId, boolean>;

export interface ShortcutInfo {
  id: ShortcutId;
  label: string;
  key: string;
}

export const SHORTCUTS: readonly ShortcutInfo[] = [
  { id: "loopToggle", label: "Loop Toggle", key: "R" },
  { id: "gyazoCapture", label: "Gyazo Capture", key: "G" },
] as const;

export const shortcutEnabledItems: Record<
  ShortcutId,
  WxtStorageItem<boolean, Record<string, never>>
> = {
  loopToggle: storage.defineItem<boolean>("sync:shortcut-loopToggle", {
    fallback: true,
  }),
  gyazoCapture: storage.defineItem<boolean>("sync:shortcut-gyazoCapture", {
    fallback: true,
  }),
};

export const loadAllSettings = async (): Promise<ShortcutSettings> => {
  const [loopToggle, gyazoCapture] = await Promise.all([
    shortcutEnabledItems.loopToggle.getValue(),
    shortcutEnabledItems.gyazoCapture.getValue(),
  ]);
  return { loopToggle, gyazoCapture };
};
