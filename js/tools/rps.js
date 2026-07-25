import { setToolAction } from "../chrome.js";

const CHOICES = [
  { id: "rock", label: "Rock", emoji: "✊" },
  { id: "paper", label: "Paper", emoji: "✋" },
  { id: "scissors", label: "Scissors", emoji: "✌️" },
];

const BEATS = { rock: "scissors", paper: "rock", scissors: "paper" };

let root;
let score;
let onClick;

function render(resultText, playerChoice, cpuChoice) {
  root.querySelector(".rps-score").textContent = `You ${score.player} — ${score.cpu} Computer`;
  const resultEl = root.querySelector(".rps-result");
  resultEl.textContent = resultText || "Pick one!";

  const playerSlot = root.querySelector(".rps-slot--player .rps-emoji");
  const cpuSlot = root.querySelector(".rps-slot--cpu .rps-emoji");
  playerSlot.textContent = playerChoice ? CHOICES.find((c) => c.id === playerChoice).emoji : "?";
  cpuSlot.textContent = cpuChoice ? CHOICES.find((c) => c.id === cpuChoice).emoji : "?";
}

function play(choiceId) {
  const cpuId = CHOICES[Math.floor(Math.random() * 3)].id;
  let text;
  if (choiceId === cpuId) {
    text = "It's a tie!";
  } else if (BEATS[choiceId] === cpuId) {
    score.player++;
    text = "You win!";
  } else {
    score.cpu++;
    text = "Computer wins!";
  }
  render(text, choiceId, cpuId);
}

function reset() {
  score = { player: 0, cpu: 0 };
  render();
}

export function mount(container) {
  root = container;
  score = { player: 0, cpu: 0 };
  root.innerHTML = `
    <div class="rps-view">
      <div class="rps-score">You 0 — 0 Computer</div>
      <div class="rps-arena">
        <div class="rps-slot rps-slot--player"><span class="rps-emoji">?</span></div>
        <div class="rps-vs">vs</div>
        <div class="rps-slot rps-slot--cpu"><span class="rps-emoji">?</span></div>
      </div>
      <div class="rps-result">Pick one!</div>
      <div class="rps-choices">
        ${CHOICES.map(
          (c) => `<button class="rps-choice" data-choice="${c.id}"><span class="rps-choice-emoji">${c.emoji}</span><span>${c.label}</span></button>`
        ).join("")}
      </div>
    </div>
  `;
  setToolAction("Reset", reset);

  onClick = (e) => {
    const btn = e.target.closest(".rps-choice");
    if (!btn) return;
    play(btn.dataset.choice);
  };
  root.addEventListener("click", onClick);
}

export function unmount(container) {
  container.removeEventListener("click", onClick);
}
