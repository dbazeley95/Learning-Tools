import { setToolAction } from "../chrome.js";

const STATE_IDLE = "idle";
const STATE_WAITING = "waiting";
const STATE_READY = "ready";
const STATE_TOO_SOON = "too-soon";
const STATE_RESULT = "result";

let root;
let state;
let best;
let startTime;
let timeoutId;
let onClick;

function label() {
  switch (state) {
    case STATE_IDLE:
      return "Tap to start";
    case STATE_WAITING:
      return "Wait for green...";
    case STATE_READY:
      return "TAP NOW!";
    case STATE_TOO_SOON:
      return "Too soon! Tap to try again";
    default:
      return "";
  }
}

function render(lastMs) {
  const pad = root.querySelector(".reaction-pad");
  pad.className = `reaction-pad reaction-pad--${state}`;
  pad.querySelector(".reaction-label").textContent = label();

  const resultEl = root.querySelector(".reaction-result");
  if (state === STATE_RESULT && lastMs != null) {
    resultEl.textContent = `${lastMs} ms`;
  } else {
    resultEl.textContent = "";
  }
  root.querySelector(".reaction-best").textContent = best ? `Best: ${best} ms` : "";
}

function startWaiting() {
  state = STATE_WAITING;
  render();
  const delay = 1000 + Math.random() * 2500;
  timeoutId = setTimeout(() => {
    state = STATE_READY;
    startTime = performance.now();
    render();
  }, delay);
}

function reset() {
  clearTimeout(timeoutId);
  state = STATE_IDLE;
  best = null;
  render();
}

function handleTap() {
  if (state === STATE_IDLE || state === STATE_TOO_SOON || state === STATE_RESULT) {
    startWaiting();
    return;
  }
  if (state === STATE_WAITING) {
    clearTimeout(timeoutId);
    state = STATE_TOO_SOON;
    render();
    return;
  }
  if (state === STATE_READY) {
    const ms = Math.round(performance.now() - startTime);
    if (best === null || ms < best) best = ms;
    state = STATE_RESULT;
    render(ms);
  }
}

export function mount(container) {
  root = container;
  state = STATE_IDLE;
  best = null;
  root.innerHTML = `
    <div class="reaction-view">
      <div class="reaction-best"></div>
      <button class="reaction-pad reaction-pad--idle">
        <span class="reaction-label">Tap to start</span>
      </button>
      <div class="reaction-result"></div>
    </div>
  `;
  setToolAction("Reset", reset);

  onClick = (e) => {
    if (e.target.closest(".reaction-pad")) {
      handleTap();
    }
  };
  root.addEventListener("click", onClick);
  render();
}

export function unmount(container) {
  clearTimeout(timeoutId);
  container.removeEventListener("click", onClick);
}
