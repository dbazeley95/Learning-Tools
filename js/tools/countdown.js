import { formatClock } from "../utils/format.js";

const MIN_DURATION = 15_000;
const DEFAULT_DURATION = 5 * 60_000;
const MAX_DURATION = 60 * 60_000;

let root;
let state;
let rafId = null;
let audioCtx = null;
let onClick;

function playBeep() {
  try {
    audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = "sine";
    osc.frequency.value = 880;
    gain.gain.setValueAtTime(0.001, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.3, audioCtx.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.5);
    osc.connect(gain).connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.5);
  } catch {
    // Web Audio unavailable — the visual flash still communicates time's up.
  }
}

function render() {
  root.querySelector(".countdown-display").textContent = formatClock(state.remaining);
  const pct = state.duration > 0 ? (state.remaining / state.duration) * 100 : 0;
  root.querySelector(".countdown-progress-fill").style.width = `${pct}%`;
  root.querySelector(".countdown-duration-label").textContent = `Duration: ${formatClock(state.duration)}`;
  const startBtn = root.querySelector(".countdown-start");
  startBtn.textContent = state.running
    ? "Pause"
    : state.remaining < state.duration && state.remaining > 0
      ? "Resume"
      : "Start";
}

function tick() {
  const now = performance.now();
  state.remaining = Math.max(0, state.duration - (now - state.startedAt));
  render();
  if (state.remaining <= 0) {
    state.running = false;
    root.querySelector(".countdown-view").classList.add("countdown-done");
    playBeep();
    return;
  }
  rafId = requestAnimationFrame(tick);
}

function start() {
  if (state.running || state.remaining <= 0) return;
  state.running = true;
  state.startedAt = performance.now() - (state.duration - state.remaining);
  root.querySelector(".countdown-view").classList.remove("countdown-done");
  rafId = requestAnimationFrame(tick);
  render();
}

function pause() {
  state.running = false;
  if (rafId) cancelAnimationFrame(rafId);
  render();
}

function reset() {
  pause();
  state.remaining = state.duration;
  root.querySelector(".countdown-view").classList.remove("countdown-done");
  render();
}

function setDuration(ms) {
  pause();
  state.duration = Math.min(MAX_DURATION, Math.max(MIN_DURATION, ms));
  state.remaining = state.duration;
  render();
}

function adjustDuration(deltaMs) {
  setDuration(state.duration + deltaMs);
}

export function mount(container) {
  root = container;
  state = { duration: DEFAULT_DURATION, remaining: DEFAULT_DURATION, running: false, startedAt: 0 };

  root.innerHTML = `
    <div class="countdown-view">
      <div class="countdown-display">00:00</div>
      <div class="countdown-progress"><div class="countdown-progress-fill"></div></div>
      <div class="countdown-duration-label"></div>
      <div class="countdown-presets">
        <button class="countdown-preset" data-ms="60000">1 min</button>
        <button class="countdown-preset" data-ms="120000">2 min</button>
        <button class="countdown-preset" data-ms="300000">5 min</button>
        <button class="countdown-preset" data-ms="600000">10 min</button>
      </div>
      <div class="countdown-steppers">
        <button class="countdown-step" data-delta="-60000">&minus; 1 min</button>
        <button class="countdown-step" data-delta="60000">+ 1 min</button>
        <button class="countdown-step" data-delta="-15000">&minus; 15 sec</button>
        <button class="countdown-step" data-delta="15000">+ 15 sec</button>
      </div>
      <div class="countdown-controls">
        <button class="countdown-btn countdown-reset">Reset</button>
        <button class="countdown-btn countdown-btn--primary countdown-start">Start</button>
      </div>
    </div>
  `;

  onClick = (e) => {
    const preset = e.target.closest(".countdown-preset");
    if (preset) {
      setDuration(Number(preset.dataset.ms));
      return;
    }
    const step = e.target.closest(".countdown-step");
    if (step) {
      adjustDuration(Number(step.dataset.delta));
      return;
    }
    if (e.target.closest(".countdown-start")) {
      state.running ? pause() : start();
      return;
    }
    if (e.target.closest(".countdown-reset")) {
      reset();
    }
  };
  root.addEventListener("click", onClick);
  render();
}

export function unmount(container) {
  if (rafId) cancelAnimationFrame(rafId);
  container.removeEventListener("click", onClick);
}
