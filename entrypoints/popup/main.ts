import { SHORTCUTS, shortcutEnabledItems } from "@/utils/settings";

const renderShortcuts = async (): Promise<void> => {
  const container = document.getElementById("shortcuts");
  if (!container) return;

  for (const shortcut of SHORTCUTS) {
    const enabled = await shortcutEnabledItems[shortcut.id].getValue();

    const row = document.createElement("label");
    row.className = "shortcut-row";

    const text = document.createElement("span");
    text.className = "shortcut-label";
    text.textContent = `${shortcut.label} (${shortcut.key})`;

    const toggle = document.createElement("input");
    toggle.type = "checkbox";
    toggle.className = "shortcut-toggle";
    toggle.checked = enabled;
    toggle.addEventListener("change", () => {
      shortcutEnabledItems[shortcut.id].setValue(toggle.checked);
    });

    row.appendChild(text);
    row.appendChild(toggle);
    container.appendChild(row);
  }
};

renderShortcuts();
