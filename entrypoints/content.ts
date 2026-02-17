import { clickGyazoCaptureButton, findGyazoCaptureButton } from "@/utils/gyazoCapture";
import { hasModifierKey, isTypingInTextField } from "@/utils/keyboard";
import type { ShortcutSettings } from "@/utils/settings";
import { loadAllSettings, shortcutEnabledItems } from "@/utils/settings";
import { findVideoElement, toggleVideoLoop } from "@/utils/videoLoop";

const TOAST_ID = "ysp-loop-toast";
const TOAST_DISPLAY_MS = 1500;
const TOAST_FADE_MS = 300;

export default defineContentScript({
  matches: ["*://*.youtube.com/*"],
  async main(ctx) {
    let settings: ShortcutSettings = await loadAllSettings();

    shortcutEnabledItems.loopToggle.watch((newValue) => {
      settings = { ...settings, loopToggle: newValue };
    });
    shortcutEnabledItems.gyazoCapture.watch((newValue) => {
      settings = { ...settings, gyazoCapture: newValue };
    });

    let toastTimeout: number | undefined;

    const removeToast = (): void => {
      const existing = document.getElementById(TOAST_ID);
      if (existing) {
        existing.remove();
      }
      if (toastTimeout) {
        clearTimeout(toastTimeout);
        toastTimeout = undefined;
      }
    };

    const showToast = (message: string): void => {
      removeToast();

      const toast = document.createElement("div");
      toast.id = TOAST_ID;
      toast.textContent = message;
      Object.assign(toast.style, {
        position: "fixed",
        bottom: "80px",
        left: "50%",
        transform: "translateX(-50%)",
        background: "rgba(0, 0, 0, 0.8)",
        color: "#fff",
        padding: "8px 16px",
        borderRadius: "4px",
        fontSize: "14px",
        fontFamily: "Roboto, Arial, sans-serif",
        zIndex: "99999",
        pointerEvents: "none",
        transition: "opacity 0.3s ease",
        opacity: "1",
      });

      document.body.appendChild(toast);

      toastTimeout = ctx.setTimeout(() => {
        toast.style.opacity = "0";
        toastTimeout = ctx.setTimeout(() => {
          toast.remove();
          toastTimeout = undefined;
        }, TOAST_FADE_MS);
      }, TOAST_DISPLAY_MS);
    };

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (isTypingInTextField(event)) return;
      if (hasModifierKey(event)) return;

      switch (event.key.toLowerCase()) {
        case "r": {
          if (!settings.loopToggle) return;
          const video = findVideoElement();
          if (!video) return;
          const loopEnabled = toggleVideoLoop(video);
          showToast(loopEnabled ? "Loop: ON" : "Loop: OFF");
          break;
        }
        case "g": {
          if (!settings.gyazoCapture) return;
          const button = findGyazoCaptureButton();
          if (!button) return;
          clickGyazoCaptureButton(button);
          break;
        }
      }
    };

    ctx.addEventListener(document, "keydown", handleKeyDown);

    ctx.addEventListener(window, "wxt:locationchange", () => {
      removeToast();
    });
  },
});
