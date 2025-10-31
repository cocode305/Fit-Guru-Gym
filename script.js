// =========== Mobile Navigation ============
// === Mnav Variables
const openMnav = document.getElementById("open_mnav-btn");
const closeMnav = document.getElementById("close_mnav-btn");
const mnavMenu = document.getElementById("mnav_menu");
const mnav_links = document.querySelectorAll(".mnav_link");

// === Open/Close Mobile Navigation Event Handlers
openMnav.addEventListener("click", () => {
  mnavMenu.classList.remove("max-lg:-translate-x-full");
  mnavMenu.classList.add("translate-x-0");
  mnavMenu.classList.remove("max-lg:opacity-10");
  mnavMenu.classList.add("opacity-100");
});
closeMnav.addEventListener("click", () => {
  mnavMenu.classList.remove("translate-x-0");
  mnavMenu.classList.add("max-lg:-translate-x-full");
  mnavMenu.classList.remove("opacity-100");
  mnavMenu.classList.add("max-lg:opacity-10");
});
mnav_links.forEach((link) => {
  link.addEventListener("click", () => {
    mnavMenu.classList.remove("translate-x-0");
    mnavMenu.classList.add("max-lg:-translate-x-full");
    mnavMenu.classList.remove("opacity-100");
    mnavMenu.classList.add("max-lg:opacity-10");
  });
});
// =========== Mobile Navigation End ============


// =========== Gym Membership Package Plan ============
// Membership Plan Price Variables
const monthlyPlan = document.getElementById("monthlyPlan");
const yearlyPlan = document.getElementById("yearlyPlan");

// Membership Plan Amount Variables
const beginnerAmount = document.getElementById("beginnerAmount");
const regularAmount = document.getElementById("regularAmount");
const premiumAmount = document.getElementById("premiumAmount");

// === Membership Plan Event Handler
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
// =========== Gym Membership Package Plan End ============


// =========== Review Comment Slides ============
// === Slide Nav Buttons
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

// === Slide Element Variables
const slideTrack = document.getElementById("slide_track");
const slides = document.querySelectorAll(".slide");
const originalSlideCount = slides.length;

// === Slide Initializers
let index = 1;
let isAnimating = false;

// === Get Slide Style Functions ===
function getGap() {
  // === Get Style Object For slideTrack Element
  const style = getComputedStyle(slideTrack);
  // === Get Spacing Between Slides
  const gap = style.gap || style.columnGap || style.columngap || "0px";
  // === Return Gap Value
  return parseFloat(gap) || 0;
}
function getSlideWidth() {
  // === Get First Slide
  const first = document.querySelector(".slide");
  // === Return 0 If There's No Slide After The First
  if (!first) return 0;
  // === Return the Slide Width + Space Between Slides
  return first.offsetWidth + getGap();
}
// === Get Slide Style Functions End ===

// === Refresh Main Slide and Cloned Slide Function ===
let allSlides = Array.from(document.querySelectorAll(".slide"));

function refreshSlides() {
  // === Remove old clones to avoid duplicates
  const oldClones = slideTrack.querySelectorAll(".slide.clone");
  oldClones.forEach((clone) => clone.remove());

  // === Rebuild list of real slides after new insertions
  allSlides = Array.from(slideTrack.querySelectorAll(".slide:not(.clone)"));
  const totalSlides = allSlides.length;

  // === Clone the first and last slides again
  // === Clones Variables
  const firstClone = allSlides[0].cloneNode(true);
  const lastClone = allSlides[totalSlides - 1].cloneNode(true);

  // === Add Class Names to Clones
  firstClone.classList.add("clone");
  lastClone.classList.add("clone");

  // === Append Clones For Looping
  slideTrack.appendChild(firstClone);
  slideTrack.insertBefore(lastClone, slideTrack.firstChild);

  // Update allSlides to include new clones
  allSlides = Array.from(slideTrack.querySelectorAll(".slide"));

  // Update originalSlideCount to reflect the new number of real slides
  window.originalSlideCount = totalSlides;

  // Keep carousel position consistent
  jumpToIndex(index, false);
}
refreshSlides(); // Initialize once on page load
// === Refresh Main Slide and Cloned Slide Function End ===

function jumpToIndex(idx, withTransition = false) {
  const width = getSlideWidth();

  if (withTransition) {
    slideTrack.style.transition = "transform 0.5s ease-in-out";
  } else {
    slideTrack.style.transition = "none";
  }
  slideTrack.style.transform = `translateX(${-width * idx}px)`;
}
jumpToIndex(index, false); // === Initialize once on page load

// === Move Slide ===
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
}
// === Move Slide End ===

// === Slide Navigation Event handler
nextBtn.addEventListener("click", nextSlide);
prevBtn.addEventListener("click", prevSlide);

// === Carousel Loop
slideTrack.addEventListener("transitionend", () => {
  allSlides = Array.from(document.querySelectorAll(".slide"));
  const lastIndex = allSlides.length - 1;

  if (index === lastIndex) {
    index = 1;
    jumpToIndex(index, false);
  }
  if (index === 0) {
    index = originalSlideCount;
    jumpToIndex(index, false);
  }
  setTimeout(() => {
    isAnimating = false;
  }, 20);
  if (!autoPlayInterval) startAutoPlay();
});

// === Mobile Swipe Gesture ===
// === Variable Initializers
let startX = 0;
let currentX = 0;
let isDragging = false;

// === Event handlers
slideTrack.addEventListener("touchstart", touchStart, { passive: true });
slideTrack.addEventListener("touchmove", touchMove, { passive: true });
slideTrack.addEventListener("touchend", touchEnd, { passive: true });

function touchStart(e) {
  if (isAnimating) return;
  const touch = e.touches[0];
  startX = touch.clientX;
  currentX = startX;
  isDragging = true;
  slideTrack.style.transition = "none";
}
function touchMove(e) {
  if (!isDragging) return;
  const touch = e.touches[0];
  currentX = touch.clientX;
  const diff = currentX - startX;
  const w = getSlideWidth;
  slideTrack.style.transform = `translateX(${-w * index + diff}px)`;
}
function touchEnd() {
  if (!isDragging) return;
  isDragging = false;
  const diff = currentX - startX;
  const threshold = Math.max(40, getSlideWidth() * 0.15); // === Minimum swipe distance

  if (diff > threshold) {
    prevSlide();
  } else if (diff < -threshold) {
    nextSlide();
  } else {
    jumpToIndex(index, true);
  }

  // Reset Swipe
  startX = 0;
  currentX = 0;
}
window.addEventListener("resize", () => {
  clearTimeout(window._sliderResizeTimer);
  window._sliderResizeTimer = setTimeout(() => {
    jumpToIndex(index, false);
  }, 80);
});
// === Mobile Swipe Gesture End ===

// === Auto Play for slides ===
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

// === Event handler to stop/play slider on mouse hover/leave on slides
slideTrack.addEventListener("mouseenter", stopAutoPlay);
slideTrack.addEventListener("mouseleave", startAutoPlay);
// === Event handler to stop/play slider on mouse hover/leave on slide nav buttons
prevBtn.addEventListener("mouseenter", stopAutoPlay);
prevBtn.addEventListener("mouseleave", startAutoPlay);
nextBtn.addEventListener("mouseenter", stopAutoPlay);
nextBtn.addEventListener("mouseleave", startAutoPlay);
// === Event handler to stop/play slider on screen tap on slide
slideTrack.addEventListener("touchstart", stopAutoPlay);
slideTrack.addEventListener("touchend", startAutoPlay);
startAutoPlay();

// === Auto Play for slides End ===



// ===== Logic To Handle User Review Comment Form Section =====

const overlay = document.getElementById("overlay");
const openFormBtn = document.getElementById("opinion-btn");
const reviewFormContainer = document.getElementById("review_form-container");
const reviewForm = document.getElementById("review_form");
const allStars = document.querySelectorAll(".star");
// === Input Fields
const ratingValue = document.getElementById("rating");
const userName = document.getElementById("username");
const userComment = document.getElementById("user_comment");
// === Form Buttons
const submitFormBtn = document.getElementById("submit-btn");
const cancelFormBtn = document.getElementById("cancel-btn");

// === Open and Close the Review Form
openFormBtn.addEventListener("click", () => {
  reviewFormContainer.classList.remove("hidden");
  overlay.classList.remove("hidden");
});
overlay.addEventListener("click", closeReviewForm);
function closeReviewForm() {
  // === Hide Review Form
  overlay.classList.add("hidden");
  reviewFormContainer.classList.add("hidden");

  // === Reset Form Input Value
  userName.value = ""; // === Reset userName value to empty string
  userComment.value = ""; // === Reset userComment value to empty string
  ratingValue.value = 0; // === Reset rating value to zero

  // === Reset Star Ratings Style
  allStars.forEach((i) => {
    i.classList.replace("text-[#424242]", "text-[#ccc]");
    i.classList.remove("active");
  });

  reviewForm.reset(); // === Clear All Form Input Field
}

// === Sytle Star Ratings when clicked
allStars.forEach((star, idx) => {
  star.addEventListener("click", () => {
    let click = 0;
    ratingValue.value = idx + 1;

    allStars.forEach((i) => {
      i.classList.replace("text-[#424242]", "text-[#ccc]");
      i.classList.remove("active");
    });

    for (let i = 0; i < allStars.length; i++) {
      if (i <= idx) {
        allStars[i].classList.replace("text-[#ccc]", "text-[#424242]");
        allStars[i].classList.add("active");
      } else {
        allStars[i].style.setProperty("--i", click);
        click++;
      }
    }
  });
});

// === Form Validation ===
function markInvalid(field) {
  field.classList.replace("border-[#f5f5f5]", "border-red-700");
}
function markValid(field) {
  field.classList.replace("border-red-700", "border-[#f5f5f5]");
}
function validateRating() {
  allStars.forEach((star) =>
    star.classList.replace("text-[#ccc]", "text-red-700")
  );
  let revertId = setTimeout(() => {
    allStars.forEach((star) =>
      star.classList.replace("text-red-700", "text-[#ccc]")
    );
  }, 1500); // revert after 1.5s
}
[userName, userComment].forEach((field) => {
  field.addEventListener("blur", () => {
    const value = field.value.trim();
    if (value === "") {
      markInvalid(field);
    } else {
      markValid(field);
    }
  });
});
// === Form Validation End ===



// === Functions To Create New Comment Slide ===

function createReviewSlide() {
  // ===Variables
  const slideTrack = document.getElementById("slide_track");
  const userNameInput = document.getElementById("username");
  const userCommentInput = document.getElementById("user_comment");
  const ratingValue = document.getElementById("rating");

  // === Input Values
  let usernameValue = userNameInput.value.trim();
  let userCommentValue = userCommentInput.value.trim();
  let ratingNum = parseInt(ratingValue.value);
  let totalStars = 5; //Number of star element to create

  // === Star Container ===
  const starContainer = document.createElement("span");
  starContainer.classList.add("flex", "items-center", "text-base");

  // === Create 5 stars inside the starContainer with styling to indicate user rating
  for (let i = 1; i <= totalStars; i++) {
    const star = document.createElement("span");
    star.innerHTML = "&#9733;";
    star.classList.add(i <= ratingNum ? "text-[#424242]" : "text-[#ccc]");
    starContainer.append(star); // === Add created star to container
  }

  // === Star Container End ===

  // === Create New Slide Elements
  const newReviewSlide = document.createElement("div");
  newReviewSlide.classList.add(
    "flex-none",
    "shadow-[0px_2px_4px_0px_rgba(0,0,0,0.4)]",
    "rounded-lg",
    "px-6",
    "py-[28px]",
    "w-full",
    "lg:w-[485px]",
    "slide",
    "new-review-slide" // === Tailwind utility Class name to hook element in localStorage function
  );

  // === Fill the slide element with collected data
  newReviewSlide.innerHTML = `
  <div class = "user_rating-wrapper">
    <h3 class="text-2xl text-[#424242] font-semibold">${usernameValue}</h3>
  </div>
  <!-- Text Content -->
  <p class="text-sm text-[#757575] mt-6">“${userCommentValue}”</p>
  `;

  // === Target user rating wrapper in the new slide and add the star container to it
  const userRatingWrapper = newReviewSlide.querySelector(
    ".user_rating-wrapper"
  );
  userRatingWrapper.append(starContainer);

  // === Object to pass data to the saveReviewsToLocalStorage() function
  const reviewData = {
    username: usernameValue,
    comment: userCommentValue,
    rating: ratingNum,
  };

  // === Safe Insert ===
  stopAutoPlay(); // pause autoplay temporarily
  slideTrack.style.transition = "none"; // Prevent shifting during insertion

  // === Insert new review slide before the first cloned slide
  const firstClone = slideTrack.firstElementChild;
  slideTrack.insertBefore(newReviewSlide, firstClone);
  saveReviews(reviewData); // === Save user entry to localStorage

  refreshSlides(); // Recreate clones and refresh list

  // Re-enable autoplay and transitions
  jumpToIndex(index, false);
  startAutoPlay();
}
// === Save user review data to local starage ===
function saveReviews(reviewData) {
  // === Get Existing Saved Reviews
  let savedReviews = JSON.parse(localStorage.getItem("userReviews")) || [];

  // === Add New Reviews To Review Data List
  savedReviews.push(reviewData);

  // === Resave To localStorage
  localStorage.setItem("userReviews", JSON.stringify(savedReviews));
}
// === Retrieve saved data
function loadSavedReviews() {
  // === Get The Saved Review Data From Local Storage ===
  let savedReviews = JSON.parse(localStorage.getItem("userReviews")) || [];

  // === Recreate Each Comment Slide ===
  savedReviews.forEach((review) => {
    recreateReviewSlide(review); // === Callback function to recreate review comment Slide
  });
}

// === Refresh The Slide Track When The Webpage Loads ===
window.addEventListener("DOMContentLoaded", () => {
  refreshSlides(); // === Make Sure Clones and Slide Track is Updated When Page Loads
  loadSavedReviews(); // === Initialize function to load saved review data When Page Loads
});

  
// === Recreate review slide from saved data
function recreateReviewSlide(review) {
  // === Slide Track Variable
  const slideTrack = document.getElementById("slide_track");

  // === Initialize Input Values From reviewData Object
  let usernameValue = review.username;
  let userCommentValue = review.comment;
  let ratingNum = review.rating;
  let totalStars = 5;

  // === Star Element Structure ===
  // === Create and Style Star Container
  const starContainer = document.createElement("span");
  starContainer.classList.add("flex", "items-center", "text-base");

  // === Create, Attach And Style 5 Star Span Element To starContainer For Each User Satisfaction Rating Value
  for (let i = 1; i <= totalStars; i++) {
    const star = document.createElement("span");
    star.innerHTML = "&#9733;";
    star.classList.add(i <= ratingNum ? "text-[#424242]" : "text-[#ccc]");
    starContainer.append(star);
  }
  // === Star Element Structure End ====

  // === Recreate Slide ===
  // === Create and Style Slide Element Structure
  const reviewSlide = document.createElement("div");
  reviewSlide.classList.add(
    "flex-none",
    "shadow-[0px_2px_4px_0px_rgba(0,0,0,0.4)]",
    "rounded-lg",
    "px-6",
    "py-[28px]",
    "w-full",
    "lg:w-[485px]",
    "slide",
    "new-review-slide"
  );

  // Fill Slide Element With User Data
  reviewSlide.innerHTML = `
  <div id = "user_rating-wrapper">
    <h3 class="text-2xl text-[#424242] font-semibold">${usernameValue}</h3>
  </div>
  <!-- Text Content -->
  <p class="text-sm text-[#757575] mt-6">“${userCommentValue}”</p>
  `;

  // Add starContainer to userRatingWrapper
  const userRatingWrapper = reviewSlide.querySelector("#user_rating-wrapper");
  userRatingWrapper.append(starContainer);
  // === Recreate Slide End ===


  // === Safely Insert Slides ===
  stopAutoPlay(); // pause autoplay temporarily
  slideTrack.style.transition = "none"; // Prevent shifting during insertion

  // === Insert Recreated Slide Before the First Cloned Slide
  const firstClone = slideTrack.firstElementChild;
  slideTrack.insertBefore(reviewSlide, firstClone);

  refreshSlides(); // === Recreate Clones and Refresh List

  // Re-enable autoplay and transitions
  jumpToIndex(index, false);
  startAutoPlay();
}
// === Save user review data to local starage End ===

// === Functions To Create New Comment Slide End ===



// === Validate form on submission ===
// === Form Submit
reviewForm.addEventListener("submit", (e) => {
  e.preventDefault(); // === Prevent form default action

  // === Input Fields Values
  let userNameValue = userName.value.trim(); // === Remove extra whitespace
  let userCommentValue = userComment.value.trim(); // === Remove extra whitespace
  let ratingNum = parseInt(ratingValue.value); // === Return a number value from the input field
  let isValid = true; // === Valid state initializer

  // === Validate Username
  if (userNameValue === "") {
    markInvalid(userName);
    isValid = false;
  } else markValid(userName);

  // === Validate Comment
  if (userCommentValue === "") {
    markInvalid(userComment);
    isValid = false;
  } else markValid(userComment);

  // === Validate Star Rating
  if (!ratingNum || ratingNum < 1) {
    isValid = false;
    validateRating(); // === Callback to style star rating function if rating number is 0 or less than 1
  }

  // === reviewData Object
  const reviewData = {
    userName: userName.value.trim(),
    userComment: userComment.value.trim(),
    userRating: parseInt(ratingValue.value),
  };

  // Submit form when all validation checks return true.
  if (isValid) {
    // === Create review slide if form is valid
    createReviewSlide();
    // === Reset form input field
    reviewForm.reset();
  }
});
// === Cancel form ===
reviewForm.addEventListener("reset", closeReviewForm);
// ===== Logic To Handle User Review Comment Form Section End =====
