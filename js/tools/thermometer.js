const MIN = 0;
const MAX = 100;
const STEP = 5;

let root;
let track;
let value;
let dragging = false;
let onClick;
let onPointerDown, onPointerMove, onPointerUp;

function render() {
  root.querySelector(".therm-fill").style.height = `${value}%`;
  root.querySelector(".therm-value").textContent = `${value}`;
}

function setValue(v) {
  value = Math.min(MAX, Math.max(MIN, Math.round(v)));
  render();
}

function updateFromPointer(e) {
  const rect = track.getBoundingClientRect();
  const ratio = 1 - (e.clientY - rect.top) / rect.height;
  setValue(MIN + ratio * (MAX - MIN));
}

export function mount(container) {
  root = container;
  value = 50;
  root.innerHTML = `
    <div class="therm-view">
      <div class="therm-value-row">
        <button class="therm-btn therm-minus" aria-label="Decrease">&minus;</button>
        <span class="therm-value">50</span>
        <button class="therm-btn therm-plus" aria-label="Increase">+</button>
      </div>
      <div class="therm-track">
        <div class="therm-fill"></div>
      </div>
    </div>
  `;
  track = root.querySelector(".therm-track");

  onClick = (e) => {
    if (e.target.closest(".therm-minus")) setValue(value - STEP);
    if (e.target.closest(".therm-plus")) setValue(value + STEP);
  };
  onPointerDown = (e) => {
    dragging = true;
    track.classList.add("dragging");
    try {
      track.setPointerCapture(e.pointerId);
    } catch {
      // pointer capture unavailable — dragging still tracked via pointermove
    }
    updateFromPointer(e);
  };
  onPointerMove = (e) => {
    if (!dragging) return;
    updateFromPointer(e);
  };
  onPointerUp = (e) => {
    dragging = false;
    track.classList.remove("dragging");
    try {
      track.releasePointerCapture(e.pointerId);
    } catch {
      // pointer capture already released
    }
  };

  root.addEventListener("click", onClick);
  track.addEventListener("pointerdown", onPointerDown);
  track.addEventListener("pointermove", onPointerMove);
  track.addEventListener("pointerup", onPointerUp);
  track.addEventListener("pointercancel", onPointerUp);
  render();
}

export function unmount(container) {
  container.removeEventListener("click", onClick);
  if (track) {
    track.removeEventListener("pointerdown", onPointerDown);
    track.removeEventListener("pointermove", onPointerMove);
    track.removeEventListener("pointerup", onPointerUp);
    track.removeEventListener("pointercancel", onPointerUp);
  }
}
