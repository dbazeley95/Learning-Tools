const COLORS = ["#f4f6fb", "#c0392b", "#3f7cac", "#4a9e5c", "#d4a72c", "#7c5cbf"];

let root;
let canvas, ctx;
let drawing = false;
let prevPoint = null;
let prevMid = null;
let color = COLORS[0];
let mode = "pen";
let lineWidth = 4;
let resizeObserver;
let onToolbarClick, onPointerDown, onPointerMove, onPointerUp;

function resizeCanvas() {
  const rect = canvas.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.scale(dpr, dpr);
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
}

function getPoint(e) {
  const rect = canvas.getBoundingClientRect();
  return { x: e.clientX - rect.left, y: e.clientY - rect.top, pressure: e.pressure || 0.5 };
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

export function mount(container) {
  root = container;
  root.innerHTML = `
    <div class="wb-view">
      <div class="wb-toolbar">
        ${COLORS.map(
          (c, i) =>
            `<button class="wb-swatch${i === 0 ? " wb-swatch--active" : ""}" style="--swatch-color:${c}" data-color="${c}" aria-label="Color"></button>`
        ).join("")}
        <button class="wb-eraser" aria-label="Eraser">Eraser</button>
        <button class="wb-clear" aria-label="Clear">Clear</button>
      </div>
      <canvas class="wb-canvas"></canvas>
    </div>
  `;
  canvas = root.querySelector(".wb-canvas");
  ctx = canvas.getContext("2d");
  color = COLORS[0];
  mode = "pen";
  resizeCanvas();

  onToolbarClick = (e) => {
    const swatch = e.target.closest(".wb-swatch");
    if (swatch) {
      color = swatch.dataset.color;
      mode = "pen";
      root.querySelectorAll(".wb-swatch").forEach((s) => s.classList.toggle("wb-swatch--active", s === swatch));
      root.querySelector(".wb-eraser").classList.remove("wb-eraser--active");
      return;
    }
    if (e.target.closest(".wb-eraser")) {
      mode = "eraser";
      root.querySelector(".wb-eraser").classList.add("wb-eraser--active");
      root.querySelectorAll(".wb-swatch").forEach((s) => s.classList.remove("wb-swatch--active"));
      return;
    }
    if (e.target.closest(".wb-clear")) {
      clearCanvas();
    }
  };

  onPointerDown = (e) => {
    drawing = true;
    try {
      canvas.setPointerCapture(e.pointerId);
    } catch {
      // pointer capture unavailable — drawing still tracked via pointermove
    }
    prevPoint = getPoint(e);
    prevMid = prevPoint;
  };

  onPointerMove = (e) => {
    if (!drawing) return;
    const point = getPoint(e);
    const mid = { x: (prevPoint.x + point.x) / 2, y: (prevPoint.y + point.y) / 2 };
    ctx.globalCompositeOperation = mode === "eraser" ? "destination-out" : "source-over";
    ctx.strokeStyle = color;
    ctx.lineWidth = mode === "eraser" ? lineWidth * 4 : lineWidth * (0.6 + point.pressure);
    ctx.beginPath();
    ctx.moveTo(prevMid.x, prevMid.y);
    ctx.quadraticCurveTo(prevPoint.x, prevPoint.y, mid.x, mid.y);
    ctx.stroke();
    prevPoint = point;
    prevMid = mid;
  };

  onPointerUp = (e) => {
    drawing = false;
    try {
      canvas.releasePointerCapture(e.pointerId);
    } catch {
      // pointer capture already released
    }
    prevPoint = null;
    prevMid = null;
  };

  root.querySelector(".wb-toolbar").addEventListener("click", onToolbarClick);
  canvas.addEventListener("pointerdown", onPointerDown);
  canvas.addEventListener("pointermove", onPointerMove);
  canvas.addEventListener("pointerup", onPointerUp);
  canvas.addEventListener("pointercancel", onPointerUp);

  resizeObserver = new ResizeObserver(() => resizeCanvas());
  resizeObserver.observe(canvas);
}

export function unmount(container) {
  if (resizeObserver) {
    resizeObserver.disconnect();
    resizeObserver = null;
  }
  const toolbar = container.querySelector(".wb-toolbar");
  if (toolbar) toolbar.removeEventListener("click", onToolbarClick);
  if (canvas) {
    canvas.removeEventListener("pointerdown", onPointerDown);
    canvas.removeEventListener("pointermove", onPointerMove);
    canvas.removeEventListener("pointerup", onPointerUp);
    canvas.removeEventListener("pointercancel", onPointerUp);
  }
}
