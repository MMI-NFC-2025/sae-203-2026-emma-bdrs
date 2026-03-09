// Logique du carrousel — Notre équipe
class Carousel {
  constructor(carouselElement) {
    this.carousel = carouselElement;
    this.track = carouselElement.querySelector('.carousel__track');
    this.slides = Array.from(this.track.querySelectorAll('.carousel__slide'));
    this.btnPrev = carouselElement.querySelector('.carousel__button--prev');
    this.btnNext = carouselElement.querySelector('.carousel__button--next');
    
    this.currentIndex = 0;
    this.totalSlides = this.slides.length;
    
    this.init();
  }

  init() {
    if (this.btnPrev) this.btnPrev.addEventListener('click', () => this.prev());
    if (this.btnNext) this.btnNext.addEventListener('click', () => this.next());
    this.updateTrack();
  }

  updateTrack() {
    const offset = -this.currentIndex * 100;
    this.track.style.transform = `translateX(${offset}%)`;
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.totalSlides;
    this.updateTrack();
  }

  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.totalSlides) % this.totalSlides;
    this.updateTrack();
  }
}

// Initialiser tous les carrousels au chargement du DOM
document.addEventListener('DOMContentLoaded', () => {
  const carousels = document.querySelectorAll('.carousel');
  carousels.forEach(carousel => new Carousel(carousel));
});

export { Carousel };