/**
 * Find the Gyazo capture button in YouTube player controls.
 * The Gyazo Chrome extension injects this button into .ytp-right-controls.
 */
export const findGyazoCaptureButton = (): HTMLButtonElement | null => {
  return document.querySelector<HTMLButtonElement>("button.GyazoButtonIcon");
};

/**
 * Click the Gyazo capture button to take a screenshot of the current frame.
 */
export const clickGyazoCaptureButton = (button: HTMLButtonElement): void => {
  button.click();
};
