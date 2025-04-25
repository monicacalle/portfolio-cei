"use strict";

// DOM Elements
const track = document.getElementById("carouselTrack");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");

let testimonials = [];
let currentSlide = 0;
let itemsPerView = getItemsPerView();

// Fetch JSON data
fetch("./data/reviews.json")
  .then((res) => res.json())
  .then((data) => {
    testimonials = data;
    renderCards();
    updateTrackPosition();
  });

// Calculates how many cards to show per view based on screen width

function getItemsPerView() {
  const width = window.innerWidth;
  if (width >= 1024) return 3;
  if (width >= 600) return 2;
  return 1;
}

//Renders all testimonial cards into the track

function renderCards() {
  track.innerHTML = "";
  testimonials.forEach((t) => {
    const card = document.createElement("div");
    card.className = "carousel__card";
    card.innerHTML = `
      <div class="carousel__card-inner">
        <img src="${t.image}" alt="${t.name}" class="carousel__card-img" loading="lazy" />
        <h3 class="carousel__card-name">${t.name}</h3>
        <h4 class="carousel__card-role">${t.position}</h4>
        <p class="carousel__card-desc">${t.description}</p>
      </div>
    `;
    track.appendChild(card);
  });
}

//Moves the track based on currentSlide index

function updateTrackPosition() {
  const slideWidth = (track.clientWidth / testimonials.length) * itemsPerView;
  const offset = currentSlide * slideWidth;
  track.style.transform = `translateX(-${offset}px)`;
}

//Updates the number of items per view and rerenders

function handleResize() {
  const newItemsPerView = getItemsPerView();
  if (newItemsPerView !== itemsPerView) {
    itemsPerView = newItemsPerView;
    currentSlide = 0;
    renderCards();
    updateTrackPosition();
  }
}

// Need help from ChatGPT to improve or correctly implement this function
// The goal is to ensure the carousel works as expected, especially with responsive design and slide transitions.
function updateTrackPosition() {
  const slideWidth = track.querySelector(".carousel__card").offsetWidth;
  track.style.transform = `translateX(-${slideWidth * currentSlide}px)`;
}

function handleResize() {
  const newItemsPerView = getItemsPerView();
  if (newItemsPerView !== itemsPerView) {
    itemsPerView = newItemsPerView;
    currentSlide = 0;
    updateTrackPosition();
  }
}

//Event Listeners

nextBtn.addEventListener("click", () => {
  if (currentSlide < testimonials.length - itemsPerView) {
    currentSlide++;
    updateTrackPosition();
  }
});

prevBtn.addEventListener("click", () => {
  if (currentSlide > 0) {
    currentSlide--;
    updateTrackPosition();
  }
});

window.addEventListener("resize", handleResize);
