// src/js/faq.js

const setupAccordions = () => {
  /* ==========================
     ACCORDÉON HÉBERGEMENTS
  ========================== */
  const hebButtons = document.querySelectorAll(".heb__btn");

  hebButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const expanded = btn.getAttribute("aria-expanded") === "true";
      const newState = !expanded;
      btn.setAttribute("aria-expanded", String(newState));

      const content = btn.nextElementSibling;
      if (!content) return;

      if (newState) {
        // ouvrir
        content.hidden = false;               // rendre visible
        // forcer un reflow pour que la transition démarre bien
        void content.offsetHeight;
        content.classList.add("is-open");
      } else {
        // fermer avec animation puis remettre hidden
        content.classList.remove("is-open");
        content.addEventListener(
          "transitionend",
          () => {
            if (!content.classList.contains("is-open")) {
              content.hidden = true;
            }
          },
          { once: true }
        );
      }
    });
  });

  /* ==========================
     ACCORDÉON FAQ
  ========================== */
  const faqButtons = document.querySelectorAll(".faq__question");

  faqButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const expanded = btn.getAttribute("aria-expanded") === "true";
      const newState = !expanded;
      btn.setAttribute("aria-expanded", String(newState));

      const answer = btn.nextElementSibling;
      if (!answer) return;

      if (newState) {
        answer.hidden = false;
        void answer.offsetHeight;
        answer.classList.add("is-open");
      } else {
        answer.classList.remove("is-open");
        answer.addEventListener(
          "transitionend",
          () => {
            if (!answer.classList.contains("is-open")) {
              answer.hidden = true;
            }
          },
          { once: true }
        );
      }

      // change + / –
      const icon = btn.querySelector(".faq__icon");
      if (icon) {
        icon.textContent = newState ? "–" : "+";
      }
    });
  });
};

// pour être sûr que ça s’exécute même si le script est en module
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", setupAccordions);
} else {
  setupAccordions();
}
