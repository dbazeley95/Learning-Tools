const PIP_LAYOUTS = {
  1: [4],
  2: [0, 8],
  3: [0, 4, 8],
  4: [0, 2, 6, 8],
  5: [0, 2, 4, 6, 8],
  6: [0, 2, 3, 5, 6, 8],
};

let root;
let diceCount;
let values;
let rolling;
let onClick;

function pipsHtml(value) {
  const active = new Set(PIP_LAYOUTS[value]);
  let cells = "";
  for (let i = 0; i < 9; i++) {
    cells += `<span class="pip ${active.has(i) ? "pip--on" : ""}"></span>`;
  }
  return `<div class="die-pips">${cells}</div>`;
}

function render() {
  const dice = root.querySelector(".dice-row");
  dice.innerHTML = values
    .map((v, i) => `<div class="die ${rolling ? "die--rolling" : ""}" data-i="${i}">${pipsHtml(v)}</div>`)
    .join("");
  const total = root.querySelector(".dice-total");
  total.textContent = values.length > 1 ? `Total: ${values.reduce((a, b) => a + b, 0)}` : "";
  root.querySelector(".dice-count").textContent = `${diceCount} ${diceCount === 1 ? "die" : "dice"}`;
}

function roll() {
  if (rolling) return;
  rolling = true;
  render();
  let ticks = 0;
  const interval = setInterval(() => {
    values = values.map(() => 1 + Math.floor(Math.random() * 6));
    render();
    ticks++;
    if (ticks >= 8) {
      clearInterval(interval);
      rolling = false;
      values = values.map(() => 1 + Math.floor(Math.random() * 6));
      render();
    }
  }, 60);
}

export function mount(container) {
  root = container;
  diceCount = 1;
  values = [1];
  rolling = false;
  root.innerHTML = `
    <div class="dice-view">
      <div class="dice-row"></div>
      <div class="dice-total"></div>
      <div class="dice-controls">
        <button class="dice-btn dice-count-toggle">
          <span class="dice-count">1 die</span>
        </button>
        <button class="dice-btn dice-btn--primary dice-roll">Roll</button>
      </div>
    </div>
  `;

  onClick = (e) => {
    if (e.target.closest(".dice-roll")) {
      roll();
      return;
    }
    if (e.target.closest(".dice-count-toggle")) {
      diceCount = diceCount === 1 ? 2 : 1;
      values = Array.from({ length: diceCount }, (_, i) => values[i] || 1);
      render();
    }
  };
  root.addEventListener("click", onClick);
  render();
}

export function unmount(container) {
  container.removeEventListener("click", onClick);
}
