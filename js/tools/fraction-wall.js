const MIN_ROWS = 1;
const MAX_ROWS = 12;
const DEFAULT_ROWS = 10;

let root;
let state;
let onClick;

function buildRows() {
  let html = "";
  for (let d = 1; d <= state.rows; d++) {
    let segs = "";
    for (let i = 0; i < d; i++) {
      const shaded = state.shaded[d]?.has(i);
      segs += `<button class="fw-segment${shaded ? " fw-segment--shaded" : ""}" data-d="${d}" data-i="${i}"></button>`;
    }
    html += `<div class="fw-row"><span class="fw-row-label">1/${d}</span><div class="fw-row-bar">${segs}</div></div>`;
  }
  return html;
}

function render() {
  root.querySelector(".fw-rows").innerHTML = buildRows();
  root.querySelector(".fw-row-count").textContent = `Rows: ${state.rows}`;
}

export function mount(container) {
  root = container;
  state = { rows: DEFAULT_ROWS, shaded: {} };
  root.innerHTML = `
    <div class="fw-view">
      <div class="fw-toolbar">
        <button class="fw-btn fw-rows-minus">&minus; Row</button>
        <span class="fw-row-count"></span>
        <button class="fw-btn fw-rows-plus">+ Row</button>
        <button class="fw-btn fw-clear">Clear</button>
      </div>
      <div class="fw-rows"></div>
    </div>
  `;
  onClick = (e) => {
    if (e.target.closest(".fw-rows-plus")) {
      state.rows = Math.min(MAX_ROWS, state.rows + 1);
      render();
      return;
    }
    if (e.target.closest(".fw-rows-minus")) {
      state.rows = Math.max(MIN_ROWS, state.rows - 1);
      render();
      return;
    }
    if (e.target.closest(".fw-clear")) {
      state.shaded = {};
      render();
      return;
    }
    const seg = e.target.closest(".fw-segment");
    if (seg) {
      const d = Number(seg.dataset.d);
      const i = Number(seg.dataset.i);
      state.shaded[d] = state.shaded[d] || new Set();
      if (state.shaded[d].has(i)) {
        state.shaded[d].delete(i);
      } else {
        state.shaded[d].add(i);
      }
      render();
    }
  };
  root.addEventListener("click", onClick);
  render();
}

export function unmount(container) {
  container.removeEventListener("click", onClick);
}
