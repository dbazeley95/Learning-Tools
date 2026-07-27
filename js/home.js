import { TOOLS } from "./registry.js";
import { ICONS } from "./icons.js";

export function renderHome(container) {
  container.innerHTML = "";
  for (const tool of TOOLS) {
    const tile = document.createElement("a");
    if (tool.href) {
      tile.href = tool.href;
      tile.target = "_blank";
      tile.rel = "noopener";
    } else {
      tile.href = `#/tool/${tool.id}`;
    }
    tile.className = `tile tile--${tool.color}`;
    tile.innerHTML = `
      <span class="tile-icon">${ICONS[tool.icon] ?? ""}</span>
      <span class="tile-label">${tool.name}</span>
    `;
    tile.addEventListener("pointerdown", () => tile.classList.add("pressed"));
    tile.addEventListener("pointerup", () => tile.classList.remove("pressed"));
    tile.addEventListener("pointercancel", () => tile.classList.remove("pressed"));
    container.appendChild(tile);
  }
}
