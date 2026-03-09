// src/js/menu.js
// Menu plein écran Echos Sonores
// Interaction visible sur toutes les pages avec le header

const menuBtn = document.querySelector(".header__menu-btn");
const menu = document.getElementById("mainNav");
const body = document.body;

if (menuBtn && menu) {
  const openMenu = () => {
    menu.hidden = false;                         // pour qu'il soit dans le flux
    // laisser le temps au navigateur d'appliquer `hidden = false` avant d'animer
    requestAnimationFrame(() => {
      menu.classList.add("menu--open");
    });

    menuBtn.classList.add("menu-btn--open");
    menuBtn.setAttribute("aria-expanded", "true");
    body.classList.add("has-menu-open");
    body.classList.add("u-noscroll");
  };

  const closeMenu = () => {
    menu.classList.remove("menu--open");
    menuBtn.classList.remove("menu-btn--open");
    menuBtn.setAttribute("aria-expanded", "false");
    body.classList.remove("has-menu-open");
    body.classList.remove("u-noscroll");

    // on remet hidden APRÈS la fin de la transition
    const onTransitionEnd = () => {
      if (!menu.classList.contains("menu--open")) {
        menu.hidden = true;
      }
      menu.removeEventListener("transitionend", onTransitionEnd);
    };

    menu.addEventListener("transitionend", onTransitionEnd);
  };

  const toggleMenu = () => {
    const isOpen = menu.classList.contains("menu--open");
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  // clic sur le bouton burger / croix
  menuBtn.addEventListener("click", toggleMenu);

  // clic sur un lien du menu → on ferme
  menu.addEventListener("click", (event) => {
    const link = event.target.closest(".menu__link");
    if (link) {
      closeMenu();
    }
  });

  // touche Échap → fermeture
  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menu.classList.contains("menu--open")) {
      closeMenu();
    }
  });
}
