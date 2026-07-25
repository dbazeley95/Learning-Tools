const OPTIONS = ["A", "B", "C", "D"];

let onClick;

export function mount(container) {
  container.innerHTML = `
    <div class="abcd-view">
      <button class="abcd-reset" aria-label="Reset">Reset</button>
      ${OPTIONS.map(
        (o, i) =>
          `<button class="abcd-cell abcd-cell--${i}" data-value="${o}"><span>${o}</span></button>`
      ).join("")}
    </div>
  `;
  onClick = (e) => {
    const view = container.querySelector(".abcd-view");
    if (e.target.closest(".abcd-reset")) {
      container.querySelectorAll(".abcd-cell").forEach((c) => c.classList.remove("abcd-cell--revealed"));
      view.classList.remove("has-reveal");
      return;
    }
    const cell = e.target.closest(".abcd-cell");
    if (!cell) return;
    container.querySelectorAll(".abcd-cell").forEach((c) => {
      c.classList.toggle("abcd-cell--revealed", c === cell);
    });
    view.classList.add("has-reveal");
  };
  container.addEventListener("click", onClick);
}

export function unmount(container) {
  container.removeEventListener("click", onClick);
}
