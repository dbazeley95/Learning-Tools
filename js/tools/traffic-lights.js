import { setToolAction } from "../chrome.js";

const COLORS = [
  { id: "red", label: "Stop" },
  { id: "yellow", label: "Caution" },
  { id: "green", label: "Go" },
];

let root;
let notes;
let active;
let onClick;
let onInput;

function render() {
  const view = root.querySelector(".traffic-lights");
  view.dataset.active = active || "";
  root.querySelectorAll(".light").forEach((el) => {
    el.classList.toggle("lit", el.dataset.color === active);
  });
  const notePanel = root.querySelector(".traffic-note");
  const textarea = root.querySelector(".traffic-note-input");
  if (active) {
    notePanel.hidden = false;
    notePanel.className = `traffic-note traffic-note--${active}`;
    textarea.value = notes[active];
  } else {
    notePanel.hidden = true;
  }
}

function reset() {
  active = null;
  notes = { red: "", yellow: "", green: "" };
  render();
}

export function mount(container) {
  root = container;
  notes = { red: "", yellow: "", green: "" };
  active = null;
  root.innerHTML = `
    <div class="traffic-lights">
      <div class="traffic-housing">
        ${COLORS.map(
          (c) =>
            `<button class="light light--${c.id}" data-color="${c.id}" aria-label="${c.label}"></button>`
        ).join("")}
      </div>
      <div class="traffic-note" hidden>
        <textarea class="traffic-note-input" placeholder="Add a note..."></textarea>
      </div>
    </div>
  `;
  setToolAction("Reset", reset);

  onClick = (e) => {
    const btn = e.target.closest(".light");
    if (!btn) return;
    active = btn.dataset.color;
    render();
  };
  onInput = (e) => {
    if (!e.target.closest(".traffic-note-input") || !active) return;
    notes[active] = e.target.value;
  };
  root.addEventListener("click", onClick);
  root.addEventListener("input", onInput);
  render();
}

export function unmount(container) {
  container.removeEventListener("click", onClick);
  container.removeEventListener("input", onInput);
}
