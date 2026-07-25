import { setToolAction } from "../chrome.js";

let onClick;

export function mount(container) {
  container.innerHTML = `
    <div class="tf-view">
      <button class="tf-zone tf-zone--true" data-value="true">TRUE</button>
      <button class="tf-zone tf-zone--false" data-value="false">FALSE</button>
    </div>
  `;
  const view = container.querySelector(".tf-view");

  const reset = () => {
    container.querySelectorAll(".tf-zone").forEach((z) => z.classList.remove("tf-zone--selected"));
    view.classList.remove("has-selection");
  };
  setToolAction("Reset", reset);

  onClick = (e) => {
    const zone = e.target.closest(".tf-zone");
    if (!zone) return;
    container.querySelectorAll(".tf-zone").forEach((z) => {
      z.classList.toggle("tf-zone--selected", z === zone);
    });
    view.classList.add("has-selection");
  };
  container.addEventListener("click", onClick);
}

export function unmount(container) {
  container.removeEventListener("click", onClick);
}
