import { setToolAction } from "../chrome.js";

const DEFAULT_SEGMENTS = ["1", "2", "3", "4", "5", "6"];
const COLORS = ["#c4232a", "#ebd166", "#953d76", "#2c4896", "#cfccbc", "#4a9e5c", "#d4a72c", "#7a5e13"];

let root;
let segments;
let rotation;
let spinning;
let onClick;
let onSubmit;

function polarPoint(cx, cy, r, angleDeg) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)];
}

function wheelSvg() {
  const n = segments.length;
  const slice = 360 / n;
  const cx = 150;
  const cy = 150;
  const r = 148;
  let paths = "";
  let labels = "";
  for (let i = 0; i < n; i++) {
    const start = i * slice;
    const end = start + slice;
    const [x1, y1] = polarPoint(cx, cy, r, start);
    const [x2, y2] = polarPoint(cx, cy, r, end);
    const largeArc = slice > 180 ? 1 : 0;
    const color = COLORS[i % COLORS.length];
    paths += `<path d="M${cx},${cy} L${x1.toFixed(2)},${y1.toFixed(2)} A${r},${r} 0 ${largeArc} 1 ${x2.toFixed(2)},${y2.toFixed(2)} Z" fill="${color}" stroke="#142146" stroke-width="1.5"/>`;
    const mid = start + slice / 2;
    const [lx, ly] = polarPoint(cx, cy, r * 0.62, mid);
    labels += `<text x="${lx.toFixed(2)}" y="${ly.toFixed(2)}" fill="#142146" font-size="14" font-weight="700" text-anchor="middle" dominant-baseline="middle" transform="rotate(${mid}, ${lx.toFixed(2)}, ${ly.toFixed(2)})">${segments[i]}</text>`;
  }
  return `<svg viewBox="0 0 300 300" class="spinner-svg">${paths}${labels}</svg>`;
}

function render() {
  root.querySelector(".spinner-wheel-wrap").innerHTML = wheelSvg();
  root.querySelector(".spinner-wheel-wrap").style.transform = `rotate(${rotation}deg)`;
}

function renderEditor() {
  root.querySelector(".spinner-editor-list").innerHTML = segments
    .map(
      (s, i) => `<div class="spinner-editor-row">
        <input class="spinner-editor-input" data-i="${i}" value="${s.replace(/"/g, "&quot;")}">
        <button class="spinner-editor-remove" data-i="${i}" ${segments.length <= 2 ? "disabled" : ""}>&times;</button>
      </div>`
    )
    .join("");
}

function spin() {
  if (spinning) return;
  spinning = true;
  const n = segments.length;
  const slice = 360 / n;
  const winnerIndex = Math.floor(Math.random() * n);
  const targetAngle = 360 * 5 + (360 - (winnerIndex * slice + slice / 2));
  const wheel = root.querySelector(".spinner-wheel-wrap");
  wheel.style.transition = "transform 3.5s cubic-bezier(0.16, 0.85, 0.24, 1)";
  rotation = targetAngle;
  wheel.style.transform = `rotate(${rotation}deg)`;
  root.querySelector(".spinner-result").textContent = "";

  setTimeout(() => {
    spinning = false;
    rotation = rotation % 360;
    root.querySelector(".spinner-result").textContent = `🎉 ${segments[winnerIndex]}`;
  }, 3600);
}

export function mount(container) {
  root = container;
  segments = [...DEFAULT_SEGMENTS];
  rotation = 0;
  spinning = false;
  root.innerHTML = `
    <div class="spinner-view">
      <div class="spinner-stage">
        <div class="spinner-pointer"></div>
        <div class="spinner-wheel-wrap"></div>
      </div>
      <div class="spinner-result"></div>
      <button class="spinner-spin-btn">Spin</button>
      <details class="spinner-editor">
        <summary>Edit segments</summary>
        <div class="spinner-editor-list"></div>
        <button class="spinner-editor-add">+ Add segment</button>
      </details>
    </div>
  `;
  setToolAction("Reset", () => {
    segments = [...DEFAULT_SEGMENTS];
    rotation = 0;
    const wheel = root.querySelector(".spinner-wheel-wrap");
    wheel.style.transition = "none";
    render();
    renderEditor();
    root.querySelector(".spinner-result").textContent = "";
  });

  onClick = (e) => {
    if (e.target.closest(".spinner-spin-btn")) {
      spin();
      return;
    }
    if (e.target.closest(".spinner-editor-add")) {
      segments.push(`${segments.length + 1}`);
      renderEditor();
      render();
      return;
    }
    const removeBtn = e.target.closest(".spinner-editor-remove");
    if (removeBtn) {
      const i = Number(removeBtn.dataset.i);
      if (segments.length > 2) {
        segments.splice(i, 1);
        renderEditor();
        render();
      }
    }
  };

  onSubmit = (e) => {
    const input = e.target.closest(".spinner-editor-input");
    if (!input) return;
    const i = Number(input.dataset.i);
    segments[i] = input.value || `${i + 1}`;
    render();
  };

  root.addEventListener("click", onClick);
  root.addEventListener("input", onSubmit);
  render();
  renderEditor();
}

export function unmount(container) {
  container.removeEventListener("click", onClick);
  container.removeEventListener("input", onSubmit);
}
