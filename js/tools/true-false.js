let onClick;

export function mount(container) {
  container.innerHTML = `
    <div class="tf-view">
      <button class="tf-reset" aria-label="Reset">Reset</button>
      <button class="tf-zone tf-zone--true" data-value="true">TRUE</button>
      <button class="tf-zone tf-zone--false" data-value="false">FALSE</button>
    </div>
  `;
  onClick = (e) => {
    const view = container.querySelector(".tf-view");
    if (e.target.closest(".tf-reset")) {
      container.querySelectorAll(".tf-zone").forEach((z) => z.classList.remove("tf-zone--selected"));
      view.classList.remove("has-selection");
      return;
    }
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
