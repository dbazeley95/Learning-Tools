const COLORS = [
  "#f4f6fb", // white
  "#0d0d12", // black
  "#c0392b", // red
  "#e07b39", // orange
  "#d4a72c", // gold
  "#4a9e5c", // green
  "#3f7cac", // blue
  "#2c4896", // navy
  "#7c5cbf", // purple
  "#d1477a", // pink
];

const SIZES = [
  { id: "thin", width: 2 },
  { id: "medium", width: 5 },
  { id: "thick", width: 10 },
];

const MAX_UNDO = 15;

let root;
let canvas, ctx;
let drawing = false;
let prevPoint = null;
let prevMid = null;
let color = COLORS[0];
let mode = "pen";
let lineWidth = SIZES[1].width;
let undoStack = [];
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

function pushUndoSnapshot() {
  undoStack.push(canvas.toDataURL("image/png"));
  if (undoStack.length > MAX_UNDO) undoStack.shift();
}

function undo() {
  if (!undoStack.length) return;
  const dataUrl = undoStack.pop();
  const img = new Image();
  img.onload = () => {
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    ctx.restore();
    const dpr = window.devicePixelRatio || 1;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  img.src = dataUrl;
}

function exportPNG() {
  const link = document.createElement("a");
  link.download = "whiteboard.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
}

function exportPDF() {
  const dataUrl = canvas.toDataURL("image/png");
  const win = window.open("", "_blank");
  if (!win) return;
  win.document.write(`<!doctype html>
    <html><head><title>Whiteboard</title>
    <style>
      @page { margin: 0; }
      html, body { margin: 0; padding: 0; background: #14141a; }
      img { width: 100%; height: auto; display: block; }
    </style>
    </head><body>
      <img src="${dataUrl}" onload="setTimeout(() => window.print(), 150)">
    </body></html>`);
  win.document.close();
}

export function mount(container) {
  root = container;
  root.innerHTML = `
    <div class="wb-view">
      <canvas class="wb-canvas"></canvas>
      <div class="wb-toolbar">
        <div class="wb-group wb-swatches">
          ${COLORS.map(
            (c, i) =>
              `<button class="wb-swatch${i === 0 ? " wb-swatch--active" : ""}" style="--swatch-color:${c}" data-color="${c}" aria-label="Color"></button>`
          ).join("")}
        </div>
        <div class="wb-group wb-sizes">
          ${SIZES.map(
            (s, i) =>
              `<button class="wb-size${i === 1 ? " wb-size--active" : ""}" data-size="${s.width}" aria-label="${s.id} pen"><span class="wb-size-dot" style="--dot-size:${6 + i * 6}px"></span></button>`
          ).join("")}
        </div>
        <div class="wb-group wb-actions">
          <button class="wb-btn wb-eraser" aria-label="Eraser">Eraser</button>
          <button class="wb-btn wb-undo" aria-label="Undo">Undo</button>
          <button class="wb-btn wb-clear" aria-label="Clear">Clear</button>
        </div>
        <div class="wb-group wb-export">
          <button class="wb-btn wb-export-png" aria-label="Download as image">PNG</button>
          <button class="wb-btn wb-export-pdf" aria-label="Print or save as PDF">PDF</button>
        </div>
      </div>
    </div>
  `;
  canvas = root.querySelector(".wb-canvas");
  ctx = canvas.getContext("2d");
  color = COLORS[0];
  mode = "pen";
  lineWidth = SIZES[1].width;
  undoStack = [];
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
    const sizeBtn = e.target.closest(".wb-size");
    if (sizeBtn) {
      lineWidth = Number(sizeBtn.dataset.size);
      root.querySelectorAll(".wb-size").forEach((s) => s.classList.toggle("wb-size--active", s === sizeBtn));
      return;
    }
    if (e.target.closest(".wb-eraser")) {
      mode = "eraser";
      root.querySelector(".wb-eraser").classList.add("wb-eraser--active");
      root.querySelectorAll(".wb-swatch").forEach((s) => s.classList.remove("wb-swatch--active"));
      return;
    }
    if (e.target.closest(".wb-undo")) {
      undo();
      return;
    }
    if (e.target.closest(".wb-clear")) {
      pushUndoSnapshot();
      clearCanvas();
      return;
    }
    if (e.target.closest(".wb-export-png")) {
      exportPNG();
      return;
    }
    if (e.target.closest(".wb-export-pdf")) {
      exportPDF();
    }
  };

  onPointerDown = (e) => {
    drawing = true;
    pushUndoSnapshot();
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
