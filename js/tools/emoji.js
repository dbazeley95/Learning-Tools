import { setToolAction } from "../chrome.js";

const COUNT = 16;

let root;
let active;
let onClick;

function render() {
  const big = root.querySelector(".emoji-big");
  if (active) {
    big.src = `./img/emojis/emoji_${active}.png`;
    big.classList.remove("emoji-big--empty");
  } else {
    big.src = "";
    big.classList.add("emoji-big--empty");
  }
  root.querySelectorAll(".emoji-thumb").forEach((btn) => {
    btn.classList.toggle("emoji-thumb--active", Number(btn.dataset.i) === active);
  });
}

function reset() {
  active = null;
  render();
}

export function mount(container) {
  root = container;
  active = null;
  root.innerHTML = `
    <div class="emoji-view">
      <div class="emoji-stage">
        <img class="emoji-big emoji-big--empty" alt="">
      </div>
      <div class="emoji-strip">
        ${Array.from({ length: COUNT }, (_, i) => i + 1)
          .map(
            (i) =>
              `<button class="emoji-thumb" data-i="${i}"><img src="./img/emojis/emoji_${i}.png" alt="Emoji ${i}"></button>`
          )
          .join("")}
      </div>
    </div>
  `;
  setToolAction("Reset", reset);

  onClick = (e) => {
    const btn = e.target.closest(".emoji-thumb");
    if (!btn) return;
    active = Number(btn.dataset.i);
    render();
  };
  root.addEventListener("click", onClick);
  render();
}

export function unmount(container) {
  container.removeEventListener("click", onClick);
}
