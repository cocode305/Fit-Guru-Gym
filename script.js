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
const totalSlides = slides.length;
const slideWidth = function () {
  return slides[0].offsetWidth + 24;
};


let index = 1;
let isAnimating = false;

// Clone first and last slides
const firstSlide = slides[0].cloneNode(true);
const lastSlide = slides[totalSlides - 1].cloneNode(true);


slideTrack.appendChild(firstSlide);
slideTrack.insertBefore(lastSlide, slideTrack.firstChild);


const allSlides = document.querySelectorAll('.slide');
slideTrack.style.transform = `translateX(${-slideWidth * index}px)`


nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide); 
  

function nextSlide() {
  if (isAnimating) return;
  isAnimating = true;

  index++;
  slideTrack.style.transition = 'transform 0.5s ease-in-out';
  slideTrack.style.transform = `translateX(${-slideWidth() * index}px)`
}


  
function prevSlide() {
  if (isAnimating) return;
  isAnimating = true;

  index--;
  slideTrack.style.transition = 'transform 0.5s ease-in-out';
  slideTrack.style.transform = `translateX(${-slideWidth() * index}px)`
};


// Handle Loop
slideTrack.addEventListener('transitionend', () => {
  if (index === allSlides.length - 1) {
    slideTrack.style.transition = 'none';
    index = 1;
    slideTrack.style.transform = `translateX(${-slideWidth() * index}px)`

  }

  if (index === 0) {
    slideTrack.style.transition = 'none';
    index = totalSlides;
    slideTrack.style.transform = `translateX(${-slideWidth() * index}px)`
  }
  isAnimating = false;
});



// Swipe Gesture For Mobile
let startX = 0;
let currentX = 0;
let isDragging = false;


slideTrack.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
  isDragging = true;
  slideTrack.style.transition = 'none';
});


slideTrack.addEventListener('touchmove', (e) => {
  if (!isDragging) return;
  currentX = e.touches[0].clientX;
  const diff = currentX - startX;
  slideTrack.style.transform = `translateX(${-slideWidth() * index + diff}px)`
});


slideTrack.addEventListener('touchend', () => {
  if (!isDragging) return;
  const diff = currentX - startX;
  const threshold = 50; // Minimum swipe distance

  if (diff > threshold) {
    prevSlide();
  } else if (diff < -threshold) {
    nextSlide();
  } else {
    // Snap back to original position if swipe not far eneough
    slideTrack.style.transform = 'transform 0.3s ease-in-out';
    slideTrack.style.transform = `transition(${-slideWidth() * index}px)`
  }


  isDragging = false;
});