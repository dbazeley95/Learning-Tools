import { setToolAction } from "../chrome.js";

const OPTIONS = [
  { letter: "A", esdmLetter: "E", esdmWord: "Emerging" },
  { letter: "B", esdmLetter: "S", esdmWord: "Secure" },
  { letter: "C", esdmLetter: "D", esdmWord: "Deepening" },
  { letter: "D", esdmLetter: "M", esdmWord: "Mastery" },
];

let root;
let mode;
let onClick;

function render() {
  root.querySelectorAll(".abcd-cell").forEach((cell, i) => {
    const opt = OPTIONS[i];
    cell.dataset.value = mode === "esdm" ? opt.esdmLetter : opt.letter;
    cell.querySelector(".abcd-big").textContent = mode === "esdm" ? opt.esdmLetter : opt.letter;
    const caption = cell.querySelector(".abcd-caption");
    caption.textContent = mode === "esdm" ? opt.esdmWord : "";
    caption.hidden = mode !== "esdm";
  });
  root.querySelectorAll(".abcd-toggle-label").forEach((el) => {
    el.classList.toggle("abcd-toggle-label--active", el.dataset.mode === mode);
  });
  root.querySelector(".abcd-toggle-switch").classList.toggle("abcd-toggle-switch--esdm", mode === "esdm");
}

export function mount(container) {
  root = container;
  mode = "abcd";
  root.innerHTML = `
    <div class="abcd-container">
      <div class="abcd-toggle">
        <span class="abcd-toggle-label" data-mode="abcd">ABCD</span>
        <button class="abcd-toggle-switch" aria-label="Toggle ABCD / ESDM labels">
          <span class="abcd-toggle-knob"></span>
        </button>
        <span class="abcd-toggle-label" data-mode="esdm">ESDM</span>
      </div>
      <div class="abcd-view">
        ${OPTIONS.map(
          (o, i) =>
            `<button class="abcd-cell abcd-cell--${i}" data-value="${o.letter}">
              <span class="abcd-big">${o.letter}</span>
              <span class="abcd-caption" hidden></span>
            </button>`
        ).join("")}
      </div>
    </div>
  `;
  const view = root.querySelector(".abcd-view");

  const reset = () => {
    root.querySelectorAll(".abcd-cell").forEach((c) => c.classList.remove("abcd-cell--revealed"));
    view.classList.remove("has-reveal");
  };
  setToolAction("Reset", reset);

  onClick = (e) => {
    if (e.target.closest(".abcd-toggle-switch")) {
      mode = mode === "abcd" ? "esdm" : "abcd";
      render();
      return;
    }
    const cell = e.target.closest(".abcd-cell");
    if (!cell) return;
    root.querySelectorAll(".abcd-cell").forEach((c) => {
      c.classList.toggle("abcd-cell--revealed", c === cell);
    });
    view.classList.add("has-reveal");
  };
  root.addEventListener("click", onClick);
  render();
}

export function unmount(container) {
  container.removeEventListener("click", onClick);
}
