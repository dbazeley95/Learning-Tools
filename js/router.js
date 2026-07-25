import { getTool } from "./registry.js";
import { setToolTitle, resetTitle } from "./chrome.js";

const homeView = document.getElementById("home-view");
const toolView = document.getElementById("tool-view");
const toolContainer = document.getElementById("tool-container");

let activeModule = null;

function parseHash() {
  const hash = location.hash.replace(/^#/, "") || "/";
  const match = hash.match(/^\/tool\/([a-z0-9-]+)$/);
  return match ? { route: "tool", id: match[1] } : { route: "home" };
}

async function renderRoute() {
  if (activeModule && typeof activeModule.unmount === "function") {
    activeModule.unmount(toolContainer);
  }
  activeModule = null;
  toolContainer.innerHTML = "";

  const parsed = parseHash();

  if (parsed.route === "tool") {
    const tool = getTool(parsed.id);
    if (!tool) {
      location.hash = "#/";
      return;
    }
    homeView.hidden = true;
    toolView.hidden = false;
    setToolTitle(tool.name);

    const module = await tool.mount();
    activeModule = module;
    if (typeof module.mount === "function") {
      module.mount(toolContainer);
    }
  } else {
    toolView.hidden = true;
    homeView.hidden = false;
    resetTitle();
  }
}

export function initRouter() {
  window.addEventListener("hashchange", renderRoute);
  renderRoute();
}
