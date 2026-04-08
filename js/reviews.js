'use strict';

// DOM Elements
const track = document.getElementById('carouselTrack');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
const reviewsSection = document.getElementById('reviews');

let testimonials = [];
let currentSlide = 0;
let itemsPerView = getItemsPerView();
let isAnimating = false; // guard for rapid clicks
let hasLoadedTestimonials = false;

function loadTestimonials() {
    if (hasLoadedTestimonials) return;
    hasLoadedTestimonials = true;

    fetch('./data/reviews.json')
        .then((res) => res.json())
        .then((data) => {
            testimonials = data;
            renderCards();
            updateTrackPosition(true);
        })
        .catch((error) => {
            console.error('Error cargando testimonios:', error);
        });
}

// Calculates how many cards to show per view based on screen width
function getItemsPerView() {
    const width = window.innerWidth;
    if (width >= 1024) return 3;
    if (width >= 600) return 2;
    return 1;
}

// Renders all testimonial cards plus clones for infinite scroll
function renderCards() {
    track.innerHTML = '';
    const prefix = testimonials.slice(-itemsPerView);
    const suffix = testimonials.slice(0, itemsPerView);
    const all = [...prefix, ...testimonials, ...suffix];

    all.forEach((t) => {
        const card = document.createElement('div');
        card.className = 'carousel__card';
        card.innerHTML = `
      <div class="carousel__card-inner">
        <img
          src="${t.image}"
          alt="${t.name}"
          class="carousel__card-img"
          width="300" height="200"
          decoding="async"
          loading="lazy"
        />
        <h3 class="carousel__card-name">${t.name}</h3>
        <h4 class="carousel__card-role">${t.position}</h4>
        <p class="carousel__card-desc">${t.description}</p>
      </div>`;
        track.appendChild(card);
    });
}

// Moves the track based on currentSlide index
function updateTrackPosition(instant = false) {
    if (isAnimating && !instant) return; // drop extra clicks during animation :contentReference[oaicite:2]{index=2}
    if (!track.querySelector('.carousel__card')) return;

    isAnimating = !instant;

    const slideWidth = track.querySelector('.carousel__card').offsetWidth;
    const target = -((currentSlide + itemsPerView) * slideWidth);

    track.style.transition = instant ? 'none' : 'transform 0.5s ease';
    track.style.transform = `translateX(${target}px)`;
}

// Handle window resize: recalc and reset
function handleResize() {
    if (!hasLoadedTestimonials) return;

    const newView = getItemsPerView();
    if (newView !== itemsPerView) {
        itemsPerView = newView;
        currentSlide = 0;
        renderCards();
        updateTrackPosition(true);
    }
}

// ▶️ 2. Next / Prev button listeners (guarded by isAnimating)
nextBtn.addEventListener('click', () => {
    if (!hasLoadedTestimonials) return;
    if (isAnimating) return;
    currentSlide++;
    updateTrackPosition();
});

prevBtn.addEventListener('click', () => {
    if (!hasLoadedTestimonials) return;
    if (isAnimating) return;
    currentSlide--;
    updateTrackPosition();
});

// ▶️ 3. Seamless reset on transition end
track.addEventListener('transitionend', () => {
    if (!hasLoadedTestimonials) return;

    const total = testimonials.length;

    if (currentSlide >= total) {
        currentSlide = 0;
        updateTrackPosition(true);
    }

    if (currentSlide < 0) {
        currentSlide = total - 1;
        updateTrackPosition(true);
    }

    isAnimating = false; // now allow new clicks :contentReference[oaicite:3]{index=3}
});

// ▶️ 4. Keep it responsive
window.addEventListener('resize', handleResize);

if ('IntersectionObserver' in window && reviewsSection) {
    const reviewsObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                loadTestimonials();
                reviewsObserver.disconnect();
            });
        },
        {
            rootMargin: '250px 0px'
        }
    );

    reviewsObserver.observe(reviewsSection);
} else {
    loadTestimonials();
}
