const actionBtn = document.getElementById("tool-action");
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
