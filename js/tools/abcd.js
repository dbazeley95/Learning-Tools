const OPTIONS = ["A", "B", "C", "D"];

let onClick;

export function mount(container) {
  container.innerHTML = `
    <div class="abcd-view">
      ${OPTIONS.map(
        (o, i) =>
          `<button class="abcd-cell abcd-cell--${i}" data-value="${o}"><span>${o}</span></button>`
      ).join("")}
    </div>
  `;
  onClick = (e) => {
    const cell = e.target.closest(".abcd-cell");
    if (!cell) return;
    container.querySelectorAll(".abcd-cell").forEach((c) => {
      c.classList.toggle("abcd-cell--revealed", c === cell);
    });
  };
  container.addEventListener("click", onClick);
}

export function unmount(container) {
  container.removeEventListener("click", onClick);
}
