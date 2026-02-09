/**
 * Check if the user is currently typing in a text input field.
 */
export const isTypingInTextField = (event: KeyboardEvent): boolean => {
  const target = event.target as HTMLElement | null;
  if (!target) return false;

  const tagName = target.tagName.toLowerCase();
  return (
    tagName === "input" ||
    tagName === "textarea" ||
    target.isContentEditable ||
    target.getAttribute("role") === "textbox"
  );
};

/**
 * Check if any modifier key is pressed alongside the key event.
 */
export const hasModifierKey = (event: KeyboardEvent): boolean => {
  return event.ctrlKey || event.altKey || event.shiftKey || event.metaKey;
};
