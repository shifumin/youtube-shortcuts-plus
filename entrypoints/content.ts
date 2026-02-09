import { hasModifierKey, isTypingInTextField } from "@/utils/keyboard";
import { findVideoElement, toggleVideoLoop } from "@/utils/videoLoop";

const TOAST_ID = "ysp-loop-toast";
const TOAST_DISPLAY_MS = 1500;
const TOAST_FADE_MS = 300;

export default defineContentScript({
  matches: ["*://*.youtube.com/*"],
  main(ctx) {
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
      if (event.key !== "r" && event.key !== "R") return;
      if (isTypingInTextField(event)) return;
      if (hasModifierKey(event)) return;

      const video = findVideoElement();
      if (!video) return;

      const loopEnabled = toggleVideoLoop(video);
      showToast(loopEnabled ? "Loop: ON" : "Loop: OFF");
    };

    ctx.addEventListener(document, "keydown", handleKeyDown);

    ctx.addEventListener(window, "wxt:locationchange", () => {
      removeToast();
    });
  },
});
