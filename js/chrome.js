export function setToolTitle(name) {
  const titleEl = document.getElementById("tool-title");
  titleEl.textContent = name;
  document.title = `${name} — XCET Learning Tools`;
}

export function resetTitle() {
  document.title = "XCET Learning Tools";
}
