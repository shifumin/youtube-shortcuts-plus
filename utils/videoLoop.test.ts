// @vitest-environment happy-dom
import { describe, expect, it } from "vitest";
import { toggleVideoLoop } from "./videoLoop";

describe("toggleVideoLoop", () => {
  it("enables loop when it was disabled", () => {
    const video = document.createElement("video");
    video.loop = false;

    const result = toggleVideoLoop(video);

    expect(result).toBe(true);
    expect(video.loop).toBe(true);
  });

  it("disables loop when it was enabled", () => {
    const video = document.createElement("video");
    video.loop = true;

    const result = toggleVideoLoop(video);

    expect(result).toBe(false);
    expect(video.loop).toBe(false);
  });
});
