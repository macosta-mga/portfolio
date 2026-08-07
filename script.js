const header = document.querySelector("[data-header]");
const copyButtons = document.querySelectorAll("[data-copy-value]");
const copyStatus = document.querySelector("[data-copy-status]");
const projectCategories = document.querySelectorAll("[data-project-category]");
const revealTargets = document.querySelectorAll(
  [
    "main > section",
    ".case-hero",
    ".case-meta",
    ".case-section",
    ".case-slide",
    ".back-link",
  ].join(", ")
);

projectCategories.forEach((category) => {
  const cards = category.querySelectorAll(".project-card");
  category.hidden = cards.length === 0;
});

const updateHeader = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 12);
};

window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

copyButtons.forEach((button) => {
  button.addEventListener("click", async () => {
    const value = button.dataset.copyValue ?? "";
    const message = button.dataset.copyMessage ?? "Copied.";

    try {
      await navigator.clipboard.writeText(value);
      if (copyStatus) {
        copyStatus.textContent = message;
      }
    } catch {
      if (copyStatus) {
        copyStatus.textContent = value;
      }
    }
  });
});

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

if (revealTargets.length > 0) {
  document.body.classList.add("js-motion-enabled");

  revealTargets.forEach((target) => {
    target.classList.add("scroll-reveal");
  });

  if (prefersReducedMotion.matches || !("IntersectionObserver" in window)) {
    revealTargets.forEach((target) => {
      target.classList.add("is-visible");
    });
  } else {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        rootMargin: "0px 0px -12% 0px",
        threshold: 0.12,
      }
    );

    revealTargets.forEach((target) => {
      revealObserver.observe(target);
    });
  }
}
