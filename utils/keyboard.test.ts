// @vitest-environment happy-dom
import { describe, expect, it } from "vitest";
import { hasModifierKey, isTypingInTextField } from "./keyboard";

describe("isTypingInTextField", () => {
  const createEvent = (target: EventTarget | null): KeyboardEvent => {
    const event = new KeyboardEvent("keydown", { key: "r" });
    Object.defineProperty(event, "target", { value: target });
    return event;
  };

  it("returns true for input elements", () => {
    const input = document.createElement("input");
    expect(isTypingInTextField(createEvent(input))).toBe(true);
  });

  it("returns true for textarea elements", () => {
    const textarea = document.createElement("textarea");
    expect(isTypingInTextField(createEvent(textarea))).toBe(true);
  });

  it("returns true for contenteditable elements", () => {
    const div = document.createElement("div");
    div.contentEditable = "true";
    expect(isTypingInTextField(createEvent(div))).toBe(true);
  });

  it("returns true for elements with role=textbox", () => {
    const div = document.createElement("div");
    div.setAttribute("role", "textbox");
    expect(isTypingInTextField(createEvent(div))).toBe(true);
  });

  it("returns false for regular elements", () => {
    const div = document.createElement("div");
    expect(isTypingInTextField(createEvent(div))).toBe(false);
  });

  it("returns false for button elements", () => {
    const button = document.createElement("button");
    expect(isTypingInTextField(createEvent(button))).toBe(false);
  });

  it("returns false when target is null", () => {
    expect(isTypingInTextField(createEvent(null))).toBe(false);
  });
});

describe("hasModifierKey", () => {
  it("returns true when ctrlKey is pressed", () => {
    expect(hasModifierKey(new KeyboardEvent("keydown", { key: "r", ctrlKey: true }))).toBe(true);
  });

  it("returns true when altKey is pressed", () => {
    expect(hasModifierKey(new KeyboardEvent("keydown", { key: "r", altKey: true }))).toBe(true);
  });

  it("returns true when shiftKey is pressed", () => {
    expect(hasModifierKey(new KeyboardEvent("keydown", { key: "r", shiftKey: true }))).toBe(true);
  });

  it("returns true when metaKey is pressed", () => {
    expect(hasModifierKey(new KeyboardEvent("keydown", { key: "r", metaKey: true }))).toBe(true);
  });

  it("returns false when no modifier is pressed", () => {
    expect(hasModifierKey(new KeyboardEvent("keydown", { key: "r" }))).toBe(false);
  });

  it("returns true when multiple modifiers are pressed", () => {
    expect(
      hasModifierKey(new KeyboardEvent("keydown", { key: "r", ctrlKey: true, shiftKey: true })),
    ).toBe(true);
  });
});
