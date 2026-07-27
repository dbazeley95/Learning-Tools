import { setToolAction } from "../chrome.js";

let root;

export function mount(container) {
  root = container;
  root.innerHTML = `
    <div class="wwwebi-view">
      <div class="wwwebi-box wwwebi-box--www">
        <h2 class="wwwebi-title">What Went Well</h2>
        <textarea class="wwwebi-input" data-field="www"></textarea>
      </div>
      <div class="wwwebi-box wwwebi-box--ebi">
        <h2 class="wwwebi-title">Even Better If</h2>
        <textarea class="wwwebi-input" data-field="ebi"></textarea>
      </div>
    </div>
  `;
  setToolAction("Reset", () => {
    root.querySelectorAll(".wwwebi-input").forEach((el) => (el.value = ""));
  });
}

export function unmount() {}
