import { setToolAction } from "../chrome.js";

const CATEGORIES = [
  {
    id: "spelling",
    title: "Spelling",
    color: "gold",
    items: [
      "Have I spelt <strong>subject-specific vocabulary</strong> correctly?",
      "Are my <strong>homophones</strong> correct: <strong>your/you're, there/they're/their</strong>?",
      "Have I used <strong>formal</strong> language: is my written work exam ready?",
    ],
  },
  {
    id: "punctuation",
    title: "Punctuation",
    color: "navy",
    items: [
      "Have I used <strong>capital letters</strong> correctly at the <strong>beginning</strong> of every sentence and for all names &amp; places?",
      "Have I used a <strong>full stop</strong> at the <strong>end</strong> of every sentence?",
      "Have I used <strong>apostrophes</strong> for possession and contractions?",
    ],
  },
  {
    id: "paragraphs",
    title: "Paragraphs",
    color: "mauve",
    items: [
      "Have I used a <strong>variety</strong> of <strong>paragraph starters</strong>?",
      "Is my use of <strong>tenses accurate</strong> throughout my piece of writing?",
      "Do I have <strong>one, clear, main idea</strong> for <strong>each</strong> of my paragraphs?",
    ],
  },
  {
    id: "presentation",
    title: "Presentation",
    color: "red",
    items: [
      "Is my handwriting <strong>clear</strong> and <strong>legible</strong>? Could someone else read my work easily?",
      "Is my work presented neatly and laid out in a clear and acceptable way?",
    ],
  },
];

let root;
let onClick;

export function mount(container) {
  root = container;
  root.innerHTML = `
    <div class="checklist-view">
      ${CATEGORIES.map(
        (cat) => `
        <div class="checklist-card checklist-card--${cat.color}">
          <h2 class="checklist-title">${cat.title}</h2>
          <ul class="checklist-list">
            ${cat.items
              .map(
                (item, i) =>
                  `<li class="checklist-item" data-id="${cat.id}-${i}">
                    <span class="checklist-check"></span>
                    <span class="checklist-text">${item}</span>
                  </li>`
              )
              .join("")}
          </ul>
        </div>`
      ).join("")}
    </div>
  `;
  setToolAction("Reset", () => {
    root.querySelectorAll(".checklist-item").forEach((el) => el.classList.remove("checklist-item--checked"));
  });

  onClick = (e) => {
    const item = e.target.closest(".checklist-item");
    if (!item) return;
    item.classList.toggle("checklist-item--checked");
  };
  root.addEventListener("click", onClick);
}

export function unmount(container) {
  container.removeEventListener("click", onClick);
}
