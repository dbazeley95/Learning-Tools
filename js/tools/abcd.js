import { setToolAction, setToolExtra } from "../chrome.js";

const OPTIONS = [
  { letter: "A", esdmLetter: "E", esdmWord: "Emerging" },
  { letter: "B", esdmLetter: "S", esdmWord: "Secure" },
  { letter: "C", esdmLetter: "D", esdmWord: "Deepening" },
  { letter: "D", esdmLetter: "M", esdmWord: "Mastery" },
];

let root;
let extraEl;
let mode;
let onClick;
let onExtraClick;

function render() {
  root.querySelectorAll(".abcd-cell").forEach((cell, i) => {
    const opt = OPTIONS[i];
    cell.dataset.value = mode === "esdm" ? opt.esdmLetter : opt.letter;
    cell.querySelector(".abcd-big").textContent = mode === "esdm" ? opt.esdmLetter : opt.letter;
    const caption = cell.querySelector(".abcd-caption");
    caption.textContent = mode === "esdm" ? opt.esdmWord : "";
    caption.hidden = mode !== "esdm";
  });
  const toggle = extraEl.querySelector(".ios-toggle");
  toggle.setAttribute("aria-checked", mode === "esdm" ? "true" : "false");
}

export function mount(container) {
  root = container;
  mode = "abcd";
  root.innerHTML = `
    <div class="abcd-view">
      ${OPTIONS.map(
        (o, i) =>
          `<button class="abcd-cell abcd-cell--${i}" data-value="${o.letter}">
            <span class="abcd-big">${o.letter}</span>
            <span class="abcd-caption" hidden></span>
          </button>`
      ).join("")}
    </div>
  `;
  const view = root.querySelector(".abcd-view");

  extraEl = setToolExtra(`
    <div class="ios-toggle-row">
      <span class="ios-toggle-label">ESDM</span>
      <button class="ios-toggle" role="switch" aria-checked="false" aria-label="Toggle ESDM labels">
        <span class="ios-toggle-knob"></span>
      </button>
    </div>
  `);

  const reset = () => {
    root.querySelectorAll(".abcd-cell").forEach((c) => c.classList.remove("abcd-cell--revealed"));
    view.classList.remove("has-reveal");
  };
  setToolAction("Reset", reset);

  onClick = (e) => {
    const cell = e.target.closest(".abcd-cell");
    if (!cell) return;
    root.querySelectorAll(".abcd-cell").forEach((c) => {
      c.classList.toggle("abcd-cell--revealed", c === cell);
    });
    view.classList.add("has-reveal");
  };
  root.addEventListener("click", onClick);

  onExtraClick = (e) => {
    if (!e.target.closest(".ios-toggle")) return;
    mode = mode === "abcd" ? "esdm" : "abcd";
    render();
  };
  extraEl.addEventListener("click", onExtraClick);

  render();
}

export function unmount(container) {
  container.removeEventListener("click", onClick);
  if (extraEl) extraEl.removeEventListener("click", onExtraClick);
}
