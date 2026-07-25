import { setToolAction } from "../chrome.js";

const MIN = 1;
const MAX = 100;

let root;
let target;
let guesses;
let history;
let won;
let onSubmit;
let onClick;

function render() {
  root.querySelector(".hl-attempts").textContent = `Guesses: ${guesses}`;
  const list = root.querySelector(".hl-history");
  list.innerHTML = history
    .map((h) => {
      const arrow = h.dir === "up" ? "&uarr;" : h.dir === "down" ? "&darr;" : "&#10003;";
      return `<span class="hl-chip hl-chip--${h.dir}">${h.value} ${arrow}</span>`;
    })
    .join("");

  const feedback = root.querySelector(".hl-feedback");
  if (won) {
    feedback.textContent = `🎉 Correct! It was ${target}.`;
    feedback.className = "hl-feedback hl-feedback--win";
  } else {
    feedback.textContent = `Guess a number between ${MIN} and ${MAX}`;
    feedback.className = "hl-feedback";
  }

  const input = root.querySelector(".hl-input");
  input.disabled = won;
  root.querySelector(".hl-guess-btn").disabled = won;
}

function reset() {
  target = MIN + Math.floor(Math.random() * (MAX - MIN + 1));
  guesses = 0;
  history = [];
  won = false;
  render();
  root.querySelector(".hl-input").value = "";
}

function submitGuess() {
  if (won) return;
  const input = root.querySelector(".hl-input");
  const value = Number(input.value);
  if (!value || value < MIN || value > MAX) return;

  guesses++;
  if (value === target) {
    won = true;
    history.unshift({ value, dir: "match" });
  } else if (value < target) {
    history.unshift({ value, dir: "up" });
  } else {
    history.unshift({ value, dir: "down" });
  }
  input.value = "";
  render();
}

export function mount(container) {
  root = container;
  root.innerHTML = `
    <div class="hl-view">
      <div class="hl-feedback"></div>
      <form class="hl-form">
        <input class="hl-input" type="number" inputmode="numeric" min="${MIN}" max="${MAX}" placeholder="?">
        <button type="submit" class="hl-guess-btn">Guess</button>
      </form>
      <div class="hl-attempts"></div>
      <div class="hl-history"></div>
    </div>
  `;
  setToolAction("New Number", reset);

  onSubmit = (e) => {
    e.preventDefault();
    submitGuess();
  };
  root.querySelector(".hl-form").addEventListener("submit", onSubmit);

  onClick = (e) => {
    const chip = e.target.closest(".hl-chip");
    if (chip) return;
  };
  root.addEventListener("click", onClick);

  reset();
}

export function unmount(container) {
  root.querySelector(".hl-form")?.removeEventListener("submit", onSubmit);
  container.removeEventListener("click", onClick);
}
