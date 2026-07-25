const FACES = [
  { id: "happy", label: "Happy" },
  { id: "neutral", label: "Neutral" },
  { id: "sad", label: "Sad" },
];

let root;
let counts;
let onClick;

function faceSvg(id) {
  if (id === "happy") {
    return `<svg viewBox="0 0 24 24"><circle cx="9" cy="10" r="1.3" fill="currentColor"/><circle cx="15" cy="10" r="1.3" fill="currentColor"/><path d="M7 14c1.2 1.8 2.9 2.8 5 2.8s3.8-1 5-2.8" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round"/></svg>`;
  }
  if (id === "neutral") {
    return `<svg viewBox="0 0 24 24"><circle cx="9" cy="10" r="1.3" fill="currentColor"/><circle cx="15" cy="10" r="1.3" fill="currentColor"/><line x1="7.5" y1="15.5" x2="16.5" y2="15.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`;
  }
  return `<svg viewBox="0 0 24 24"><circle cx="9" cy="10" r="1.3" fill="currentColor"/><circle cx="15" cy="10" r="1.3" fill="currentColor"/><path d="M7 17c1.2-1.8 2.9-2.8 5-2.8s3.8 1 5 2.8" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round"/></svg>`;
}

function render() {
  for (const f of FACES) {
    root.querySelector(`.smiley-count[data-face="${f.id}"]`).textContent = counts[f.id];
  }
}

export function mount(container) {
  root = container;
  counts = { happy: 0, neutral: 0, sad: 0 };
  root.innerHTML = `
    <div class="smiley-view">
      <button class="smiley-reset">Reset</button>
      <div class="smiley-faces">
        ${FACES.map(
          (f) => `
          <button class="smiley-face smiley-face--${f.id}" data-face="${f.id}" aria-label="${f.label}">
            <span class="smiley-icon">${faceSvg(f.id)}</span>
            <span class="smiley-count" data-face="${f.id}">0</span>
          </button>`
        ).join("")}
      </div>
    </div>
  `;
  onClick = (e) => {
    if (e.target.closest(".smiley-reset")) {
      counts = { happy: 0, neutral: 0, sad: 0 };
      render();
      return;
    }
    const face = e.target.closest(".smiley-face");
    if (face) {
      counts[face.dataset.face]++;
      render();
    }
  };
  root.addEventListener("click", onClick);
}

export function unmount(container) {
  container.removeEventListener("click", onClick);
}
