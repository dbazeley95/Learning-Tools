const COLORS = [
  { id: "red", label: "Stop" },
  { id: "yellow", label: "Caution" },
  { id: "green", label: "Go" },
];

let root;
let onClick;

export function mount(container) {
  root = container;
  root.innerHTML = `
    <div class="traffic-lights">
      <div class="traffic-housing">
        ${COLORS.map(
          (c) =>
            `<button class="light light--${c.id}" data-color="${c.id}" aria-label="${c.label}"></button>`
        ).join("")}
      </div>
    </div>
  `;
  onClick = (e) => {
    const btn = e.target.closest(".light");
    if (!btn) return;
    const color = btn.dataset.color;
    root.querySelectorAll(".light").forEach((el) => {
      el.classList.toggle("lit", el === btn);
    });
    root.querySelector(".traffic-lights").dataset.active = color;
  };
  root.addEventListener("click", onClick);
}

export function unmount(container) {
  container.removeEventListener("click", onClick);
}
