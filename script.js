const header = document.querySelector("[data-header]");

const updateHeader = () => {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 16);
};

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

document.querySelectorAll("[data-comparison]").forEach((comparison) => {
  const slider = comparison.querySelector("[data-slider]");
  if (!slider) return;

  const updateSplit = () => {
    comparison.style.setProperty("--split", `${slider.value}%`);
  };

  updateSplit();
  slider.addEventListener("input", updateSplit);
});

document.querySelectorAll("[data-copy]").forEach((button) => {
  button.addEventListener("click", async () => {
    const target = document.querySelector(button.dataset.copy);
    if (!target) return;

    const text = target.textContent.trim();

    try {
      await navigator.clipboard.writeText(text);
      button.classList.add("is-copied");
      setTimeout(() => button.classList.remove("is-copied"), 1200);
    } catch {
      const range = document.createRange();
      range.selectNodeContents(target);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
    }
  });
});
