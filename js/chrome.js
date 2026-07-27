const actionBtn = document.getElementById("tool-action");
const extraEl = document.getElementById("tool-extra");
let currentActionHandler = null;

export function setToolTitle(name) {
  const titleEl = document.getElementById("tool-title");
  titleEl.textContent = name;
  document.title = `${name} — XCET Learning Tools`;
}

export function resetTitle() {
  document.title = "XCET Learning Tools";
}

export function setToolAction(label, onClick) {
  if (currentActionHandler) {
    actionBtn.removeEventListener("click", currentActionHandler);
  }
  actionBtn.textContent = label;
  currentActionHandler = onClick;
  actionBtn.addEventListener("click", currentActionHandler);
  actionBtn.hidden = false;
}

export function clearToolAction() {
  if (currentActionHandler) {
    actionBtn.removeEventListener("click", currentActionHandler);
    currentActionHandler = null;
  }
  actionBtn.hidden = true;
  actionBtn.textContent = "";
}

// Lets a tool render arbitrary custom controls (e.g. a switch) into the topbar,
// alongside the action button. Returns the container so the caller can attach
// its own listeners; clearToolExtra() (called by the router on every route
// change) empties it again.
export function setToolExtra(html) {
  extraEl.innerHTML = html;
  return extraEl;
}

export function clearToolExtra() {
  extraEl.innerHTML = "";
}
