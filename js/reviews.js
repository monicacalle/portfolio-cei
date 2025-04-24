"use strict";

// Get DOM elements for the container and navigation buttons
const container = document.getElementById("reviews__container");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");

let currentIndex = 0; // Current position in the carousel
let itemsPerView = getItemsPerView(); // Number of cards visible at once
let testimonials = []; // Array to store testimonial data

// Fetch testimonial data from JSON file
fetch("./data/reviews.json")
  .then((res) => res.json())
  .then((data) => {
    testimonials = data; // Save the data
    renderTestimonials(); // Create the testimonial cards
    updateCarousel(); // Update the carousel position
  });

// Function to render testimonial cards into the container
function renderTestimonials() {
  container.innerHTML = ""; // Clear previous content

  testimonials.forEach((testimonial) => {
    const card = document.createElement("div");
    card.className = "reviews__item";

    // Template for each testimonial card
    card.innerHTML = `
      <div class="reviews__item-inner">
        <img class="reviews__item-img" src="${testimonial.image}" alt="${testimonial.image}" />
        <h2 class="reviews__item-title">${testimonial.name}</h2>
        <h4 class="reviews__item-subtitle">${testimonial.position}</h4>
        <p class="reviews__item-description">${testimonial.description}</p>
      </div>
    `;
    container.appendChild(card); // Add card to the container
  });
}

// Function to determine how many items to show based on screen size
function getItemsPerView() {
  if (window.innerWidth <= 768) return 1; // Mobile
  if (window.innerWidth <= 1024) return 2; // Tablet
  return 3; // Desktop
}

// Function to move the carousel to the current index
function updateCarousel() {
  const itemWidth = container.clientWidth / itemsPerView; // Calculate width per item
  const offset = currentIndex * itemWidth; // Calculate total offset
  container.style.transform = `translateX(-${offset}px)`; // Move the carousel
}

// Move to next slide if not at the end
nextBtn.addEventListener("click", () => {
  if (currentIndex < testimonials.length - itemsPerView) {
    currentIndex++;
    updateCarousel();
  }
});

// Move to previous slide if not at the beginning
prevBtn.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateCarousel();
  }
});

// Adjust carousel on window resize (e.g. when screen size changes)
window.addEventListener("resize", () => {
  itemsPerView = getItemsPerView(); // Recalculate visible items
  updateCarousel(); // Recalculate position
});
