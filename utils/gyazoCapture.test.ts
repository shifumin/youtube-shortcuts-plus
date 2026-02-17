// @vitest-environment happy-dom
import { describe, expect, it, vi } from "vitest";
import { clickGyazoCaptureButton, findGyazoCaptureButton } from "./gyazoCapture";

describe("findGyazoCaptureButton", () => {
  it("returns the Gyazo button when present", () => {
    const button = document.createElement("button");
    button.className = "GyazoButtonIcon ytp-button";
    document.body.appendChild(button);

    const result = findGyazoCaptureButton();

    expect(result).toBe(button);
    button.remove();
  });

  it("returns null when the Gyazo button is not present", () => {
    const result = findGyazoCaptureButton();

    expect(result).toBeNull();
  });
});

describe("clickGyazoCaptureButton", () => {
  it("clicks the button", () => {
    const button = document.createElement("button");
    const clickSpy = vi.spyOn(button, "click");

    clickGyazoCaptureButton(button);

    expect(clickSpy).toHaveBeenCalledOnce();
  });
});
