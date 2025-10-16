// Gym Membership Package Plan
// Price Plan Variables
const monthlyPlan = document.getElementById("monthlyPlan");
const yearlyPlan = document.getElementById("yearlyPlan");

// Plan Amount Variables
const beginnerAmount = document.getElementById("beginnerAmount");
const regularAmount = document.getElementById("regularAmount");
const premiumAmount = document.getElementById("premiumAmount");

monthlyPlan.addEventListener("click", () => {
  yearlyPlan.classList.remove("active_plan");
  monthlyPlan.classList.add("active_plan");

  beginnerAmount.innerHTML = "12";
  regularAmount.innerHTML = "18";
  premiumAmount.innerHTML = "25";
});
yearlyPlan.addEventListener("click", () => {
  monthlyPlan.classList.remove("active_plan");
  yearlyPlan.classList.add("active_plan");

  beginnerAmount.innerHTML = "10";
  regularAmount.innerHTML = "15";
  premiumAmount.innerHTML = "20";
});





// Review Slides
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

// Review Slide Container
const slideTrack = document.getElementById('slide_track');
const slides = document.querySelectorAll('.slide');
const originalSlideCount = slides.length;

let index = 1;
let isAnimating = false;


function getGap() {
  const style = getComputedStyle(slideTrack);
  const gap = style.gap || style.columnGap || style.columngap || '0px';
  return parseFloat(gap) || 0;
}
function getSlideWidth() {
  const first = document.querySelector('.slide');
  if (!first) return 0;
  return first.offsetWidth + getGap();
}

// Clone first and last slides
const firstSlide = slides[0].cloneNode(true);
const lastSlide = slides[originalSlideCount - 1].cloneNode(true);


slideTrack.appendChild(firstSlide);
slideTrack.insertBefore(lastSlide, slideTrack.firstChild);

// All slides including cloned slides.
let allSlides = document.querySelectorAll('.slide');


function jumpToIndex(idx, withTransition = false) {
  const width = getSlideWidth();

  if (withTransition) {
    slideTrack.style.transition = 'transform 0.5s ease-in-out'
  } else {
    slideTrack.style.transition = 'none'
  }
  slideTrack.style.transform = `translateX(${-width * idx}px)`;
}
jumpToIndex(index, false);


function nextSlide() {
  if (isAnimating) return;
  isAnimating = true;
  index++;
  jumpToIndex(index, true);
}


function prevSlide() {
  if (isAnimating) return;
  isAnimating = true;
  index--;
  jumpToIndex(index, true);
};


nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide); 
  

// Handle Loop
slideTrack.addEventListener('transitionend', () => {
  allSlides = Array.from(document.querySelectorAll('.slide'));
  const lastIndex = allSlides.length - 1;
  
  
  if (index === lastIndex) {
    index = 1;
    jumpToIndex(index, false);

  }


  if (index === 0) {
    index = originalSlideCount;
    jumpToIndex(index, false);
  }
  setTimeout(() => { isAnimating = false; }, 20);
  if (!autoPlayInterval) startAutoPlay();
});


  
// Swipe Gesture For Mobile
let startX = 0;
let currentX = 0;
let isDragging = false;


slideTrack.addEventListener('touchstart', touchStart, {passive: true});
slideTrack.addEventListener('touchmove', touchMove, {passive: true});
slideTrack.addEventListener('touchend', touchEnd, {passive: true});


function touchStart(e) {
  if (isAnimating) return;
  const touch = e.touches[0];
  startX = touch.clientX;
  currentX = startX;
  isDragging = true;
  slideTrack.style.transition = 'none'
}


function touchMove(e) {
  if (!isDragging) return;
  const touch = e.touches[0];
  currentX = touch.clientX;
  const diff = currentX - startX;
  const w = getSlideWidth;
  slideTrack.style.transform = `translateX(${ -w * index + diff }px)`
}


function touchEnd() {
  if (!isDragging) return;
  isDragging = false;
  const diff = currentX - startX;
  const threshold = Math.max(40, getSlideWidth() * 0.15); // Minimum swipe distance


  if (diff > threshold) { 
    prevSlide();
  } else if (diff < -threshold) {
    nextSlide();
  } else {
    jumpToIndex(index, true);
  }


  startX = 0;
  currentX = 0;
}



window.addEventListener('resize', () => {
  clearTimeout(window._sliderResizeTimer);
  window._sliderResizeTimer = setTimeout(() => {
    jumpToIndex(index, false);
  }, 80);
});


let autoPlayInterval;
const autoPlayDelay = 5000;


function startAutoPlay() {
  stopAutoPlay();
  autoPlayInterval = setInterval(() => {
    nextSlide();
  }, autoPlayDelay);
}

function stopAutoPlay() {
  if (autoPlayInterval) {
    clearInterval(autoPlayInterval);
    autoPlayInterval = null;
  }
}

slideTrack.addEventListener('mouseenter', stopAutoPlay);
slideTrack.addEventListener('mouseleave', startAutoPlay);


prevBtn.addEventListener('mouseenter', stopAutoPlay);
prevBtn.addEventListener('mouseleave', startAutoPlay);


nextBtn.addEventListener('mouseenter', stopAutoPlay);
nextBtn.addEventListener('mouseleave', startAutoPlay);



slideTrack.addEventListener('touchstart', stopAutoPlay);


slideTrack.addEventListener('touchend', startAutoPlay);
startAutoPlay()