// Lightbox gallery
// src/js/lightbox.js

document.addEventListener("DOMContentLoaded", () => {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = lightbox.querySelector(".lightbox__img");
  const closeBtn = document.getElementById("closeLightbox");
  const prevBtn = document.getElementById("prevImg");
  const nextBtn = document.getElementById("nextImg");
  const counterSpan = document.getElementById("imageCounter");

  const galleryImages = Array.from(
    document.querySelectorAll(".artist-gallery__img")
  );
  let currentIndex = 0;

  // Ouvrir lightbox au clic sur une image
  galleryImages.forEach((img, index) => {
    img.addEventListener("click", () => {
      currentIndex = index;
      openLightbox();
    });
  });

  // Ouvrir la lightbox
  function openLightbox() {
    lightboxImg.src = galleryImages[currentIndex].src;
    lightboxImg.alt = galleryImages[currentIndex].alt;
    lightbox.classList.add("active");
    updateCounter();
    document.body.style.overflow = "hidden";
  }

  // Fermer la lightbox
  function closeLightbox() {
    lightbox.classList.remove("active");
    document.body.style.overflow = "auto";
  }

  // Navigation
  function showNext() {
    currentIndex = (currentIndex + 1) % galleryImages.length;
    lightboxImg.src = galleryImages[currentIndex].src;
    lightboxImg.alt = galleryImages[currentIndex].alt;
    updateCounter();
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    lightboxImg.src = galleryImages[currentIndex].src;
    lightboxImg.alt = galleryImages[currentIndex].alt;
    updateCounter();
  }

  function updateCounter() {
    counterSpan.textContent = `${currentIndex + 1} / ${galleryImages.length}`;
  }

  // Event listeners
  closeBtn.addEventListener("click", closeLightbox);
  nextBtn.addEventListener("click", showNext);
  prevBtn.addEventListener("click", showPrev);

  // Fermer au clic sur le fond
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // Navigation au clavier
  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("active")) return;

    if (e.key === "Escape") {
      closeLightbox();
    } else if (e.key === "ArrowRight") {
      showNext();
    } else if (e.key === "ArrowLeft") {
      showPrev();
    }
  });
});
