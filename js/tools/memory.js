import { setToolAction } from "../chrome.js";

const SYMBOLS = ["🍎", "🐸", "⭐", "🎈", "🐳", "🚀", "🌈", "🍀"];
const PAIR_COUNT = 8;

let root;
let cards;
let flipped;
let matchedCount;
let moves;
let busy;
let onClick;

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function newDeck() {
  const pairs = SYMBOLS.slice(0, PAIR_COUNT).flatMap((s) => [s, s]);
  return shuffle(pairs).map((symbol, i) => ({ id: i, symbol, matched: false }));
}

function render() {
  root.querySelector(".memory-stats").textContent = `Moves: ${moves}  •  Matches: ${matchedCount}/${PAIR_COUNT}`;
  const grid = root.querySelector(".memory-grid");
  grid.innerHTML = cards
    .map((c) => {
      const isUp = c.matched || flipped.includes(c.id);
      return `<button class="memory-card ${isUp ? "memory-card--up" : ""} ${c.matched ? "memory-card--matched" : ""}" data-id="${c.id}">
        <span class="memory-card-face memory-card-back"></span>
        <span class="memory-card-face memory-card-front">${c.symbol}</span>
      </button>`;
    })
    .join("");
}

function reset() {
  cards = newDeck();
  flipped = [];
  matchedCount = 0;
  moves = 0;
  busy = false;
  render();
}

function flip(id) {
  if (busy) return;
  const card = cards.find((c) => c.id === id);
  if (!card || card.matched || flipped.includes(id)) return;

  flipped.push(id);
  render();

  if (flipped.length === 2) {
    busy = true;
    moves++;
    const [a, b] = flipped.map((fid) => cards.find((c) => c.id === fid));
    if (a.symbol === b.symbol) {
      a.matched = true;
      b.matched = true;
      matchedCount++;
      flipped = [];
      busy = false;
      render();
    } else {
      setTimeout(() => {
        flipped = [];
        busy = false;
        render();
      }, 700);
    }
  }
}

export function mount(container) {
  root = container;
  root.innerHTML = `
    <div class="memory-view">
      <div class="memory-stats"></div>
      <div class="memory-grid"></div>
    </div>
  `;
  setToolAction("New Game", reset);

  onClick = (e) => {
    const btn = e.target.closest(".memory-card");
    if (!btn) return;
    flip(Number(btn.dataset.id));
  };
  root.addEventListener("click", onClick);
  reset();
}

export function unmount(container) {
  container.removeEventListener("click", onClick);
}
