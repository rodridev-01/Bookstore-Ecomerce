document.addEventListener('DOMContentLoaded', function() {
    const sliderWrapper = document.querySelector('.slider-wrapper');
    const slides = document.querySelectorAll('.slide');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
  
    let currentSlide = 0;
  
    function updateSlider() {
      const offset = -currentSlide * 100;
      sliderWrapper.style.transform = `translateX(${offset}%)`;
    }
  
    function showPrevSlide() {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      updateSlider();
    }
  
    function showNextSlide() {
      currentSlide = (currentSlide + 1) % slides.length;
      updateSlider();
    }
  
    prevButton.addEventListener('click', showPrevSlide);
    nextButton.addEventListener('click', showNextSlide);
  
    updateSlider(); 
  });
  

  document.addEventListener("DOMContentLoaded", function() {
    const toggleButton = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.pag ul');

    toggleButton.addEventListener('click', function() {
      menu.classList.toggle('active');
    });
  });

  const sliderWrapper = document.querySelector('.slider-wrapper');
  const slides = document.querySelectorAll('.slide');
  const indicators = document.querySelectorAll('.indicator');
  
  let currentIndex = 0;
  let startX = 0;
  let isDragging = false;
  
  function showSlide(index) {
      const totalSlides = (slides.length)-2;
      currentIndex = (index + totalSlides) % totalSlides; 
      sliderWrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
      
      indicators.forEach((indicator, idx) => {
          indicator.classList.toggle('active', idx === currentIndex);
      });
  }
  
  // Autoplay
  setInterval(() => {
      showSlide(currentIndex + 1);
  }, 5000); 
  
  indicators.forEach(indicator => {
      indicator.addEventListener('click', (e) => {
          const index = parseInt(e.target.dataset.index);
          showSlide(index);
      });
  });
  
  sliderWrapper.addEventListener('mousedown', (e) => {
      startX = e.pageX - sliderWrapper.offsetLeft; 
      isDragging = true;
  });
  
  sliderWrapper.addEventListener('mouseleave', () => {
      isDragging = false; 
  });
  
  sliderWrapper.addEventListener('mouseup', (e) => {
      isDragging = false; 
      const endX = e.pageX - sliderWrapper.offsetLeft;
      handleSwipe(startX, endX);
  });
  
  sliderWrapper.addEventListener('mousemove', (e) => {
      if (!isDragging) return; 
      const currentX = e.pageX - sliderWrapper.offsetLeft;
      const diffX = startX - currentX; 
      if (diffX > 50) {
          showSlide(currentIndex + 1); 
          isDragging = false; 
      } else if (diffX < -50) {
          showSlide(currentIndex - 1); 
          isDragging = false; 
      }
  });
  
  function handleSwipe(start, end) {
      const diff = start - end;
      if (diff > 50) {
          showSlide(currentIndex + 1);
      } else if (diff < -50) {
          showSlide(currentIndex - 1);
      }
  }
  

const stripSlider = document.querySelector('.strip-slider .slider-wrapper');
const stripSlides = document.querySelectorAll('.strip-slider .slide');

let currentSlide = 0;
const totalSlides = stripSlides.length;

function moveToNextSlide() {
  currentSlide = (currentSlide + 1) % totalSlides; 
  const offset = -currentSlide * 100; 
  stripSlider.style.transform = `translateX(${offset}%)`;
}

setInterval(moveToNextSlide, 4000);

