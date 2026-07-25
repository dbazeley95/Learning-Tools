import { formatClockTenths } from "../utils/format.js";

let root;
let state;
let intervalId = null;
let onClick;

function render() {
  root.querySelector(".sw-display").textContent = formatClockTenths(state.elapsed);
  const startBtn = root.querySelector(".sw-start");
  startBtn.textContent = state.running ? "Pause" : state.elapsed > 0 ? "Resume" : "Start";
  const laps = root.querySelector(".sw-laps");
  laps.innerHTML = state.laps
    .map(
      (l, idx) =>
        `<li><span>Lap ${state.laps.length - idx}</span><span>${formatClockTenths(l.lapTime)}</span><span>${formatClockTenths(l.totalTime)}</span></li>`
    )
    .join("");
}

function tick() {
  state.elapsed = state.elapsedAtPause + (performance.now() - state.startedAt);
  render();
}

function start() {
  if (state.running) return;
  state.running = true;
  state.startedAt = performance.now();
  intervalId = setInterval(tick, 50);
  render();
}

function pause() {
  state.running = false;
  state.elapsedAtPause = state.elapsed;
  if (intervalId) clearInterval(intervalId);
  render();
}

function reset() {
  pause();
  state.elapsed = 0;
  state.elapsedAtPause = 0;
  state.laps = [];
  render();
}

function lap() {
  if (!state.running) return;
  const prevTotal = state.laps[0]?.totalTime ?? 0;
  state.laps.unshift({ lapTime: state.elapsed - prevTotal, totalTime: state.elapsed });
  render();
}

export function mount(container) {
  root = container;
  state = { elapsed: 0, elapsedAtPause: 0, startedAt: 0, running: false, laps: [] };
  root.innerHTML = `
    <div class="sw-view">
      <div class="sw-display">00:00.0</div>
      <div class="sw-controls">
        <button class="sw-btn sw-reset">Reset</button>
        <button class="sw-btn sw-lap">Lap</button>
        <button class="sw-btn sw-btn--primary sw-start">Start</button>
      </div>
      <ul class="sw-laps"></ul>
    </div>
  `;
  onClick = (e) => {
    if (e.target.closest(".sw-start")) {
      state.running ? pause() : start();
      return;
    }
    if (e.target.closest(".sw-reset")) {
      reset();
      return;
    }
    if (e.target.closest(".sw-lap")) {
      lap();
    }
  };
  root.addEventListener("click", onClick);
  render();
}

export function unmount(container) {
  if (intervalId) clearInterval(intervalId);
  container.removeEventListener("click", onClick);
}
