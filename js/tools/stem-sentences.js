const GROUPS = [
  {
    title: "Agree",
    color: "navy",
    sentences: [
      "I agree with this statement because...",
      "I think... because...",
      "I noticed that...",
      "I would like to build on...",
      "I would like to add...",
    ],
  },
  {
    title: "Disagree",
    color: "red",
    sentences: [
      "I disagree with this statement because...",
      "I would like to challenge what you have said because...",
      "Despite your view, I believe...",
      "I was thinking about what you said and I wonder...",
      "Another perspective is... because...",
    ],
  },
];

export function mount(container) {
  container.innerHTML = `
    <div class="stem-view">
      ${GROUPS.map(
        (g) => `
        <div class="stem-card stem-card--${g.color}">
          <h2 class="stem-card-title">${g.title}</h2>
          <ul class="stem-list">
            ${g.sentences.map((s) => `<li>${s}</li>`).join("")}
          </ul>
        </div>`
      ).join("")}
    </div>
  `;
}

export function unmount() {}
