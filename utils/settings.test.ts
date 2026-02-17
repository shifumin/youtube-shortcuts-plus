// @vitest-environment happy-dom
import { beforeEach, describe, expect, it } from "vitest";
import { fakeBrowser } from "wxt/testing";
import { loadAllSettings, shortcutEnabledItems } from "./settings";

describe("shortcutEnabledItems", () => {
  beforeEach(() => {
    fakeBrowser.reset();
  });

  it("returns true by default for loopToggle", async () => {
    const value = await shortcutEnabledItems.loopToggle.getValue();
    expect(value).toBe(true);
  });

  it("returns true by default for gyazoCapture", async () => {
    const value = await shortcutEnabledItems.gyazoCapture.getValue();
    expect(value).toBe(true);
  });

  it("persists loopToggle as false", async () => {
    await shortcutEnabledItems.loopToggle.setValue(false);
    const value = await shortcutEnabledItems.loopToggle.getValue();
    expect(value).toBe(false);
  });

  it("persists gyazoCapture as false", async () => {
    await shortcutEnabledItems.gyazoCapture.setValue(false);
    const value = await shortcutEnabledItems.gyazoCapture.getValue();
    expect(value).toBe(false);
  });
});

describe("loadAllSettings", () => {
  beforeEach(() => {
    fakeBrowser.reset();
  });

  it("returns all defaults when nothing is stored", async () => {
    const settings = await loadAllSettings();
    expect(settings).toEqual({ loopToggle: true, gyazoCapture: true });
  });

  it("reflects stored values for loopToggle", async () => {
    await shortcutEnabledItems.loopToggle.setValue(false);
    const settings = await loadAllSettings();
    expect(settings).toEqual({ loopToggle: false, gyazoCapture: true });
  });

  it("reflects stored values for gyazoCapture", async () => {
    await shortcutEnabledItems.gyazoCapture.setValue(false);
    const settings = await loadAllSettings();
    expect(settings).toEqual({ loopToggle: true, gyazoCapture: false });
  });

  it("reflects both disabled", async () => {
    await shortcutEnabledItems.loopToggle.setValue(false);
    await shortcutEnabledItems.gyazoCapture.setValue(false);
    const settings = await loadAllSettings();
    expect(settings).toEqual({ loopToggle: false, gyazoCapture: false });
  });
});
