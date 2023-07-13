const carousel = document.querySelector('.carousel');
const carouselContent = document.querySelector('.carousel-content');
const carouselItems = document.querySelectorAll('.carousel-item');
const prevButton = document.querySelector('.carousel-prev');
const nextButton = document.querySelector('.carousel-next');
const itemWidth = carouselItems[0].offsetWidth;
const itemCount = carouselItems.length;
let position = 0;

prevButton.addEventListener('click', () => {
  position += itemWidth;
  position = Math.min(position, 0);
  carouselContent.style.transform = `translateX(${position}px)`;
});

nextButton.addEventListener('click', () => {
  position -= itemWidth;
  position = Math.max(position, -itemWidth * (itemCount - 1));
  carouselContent.style.transform = `translateX(${position}px)`;
});
