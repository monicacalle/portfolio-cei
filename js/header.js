'use strict';

const menuIcon = document.querySelector('.menu__icon');
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.navbar__link');
const desktopBreakpoint = window.matchMedia('(min-width: 769px)');
let isTicking = false;

const closeMenu = () => {
    navbar.classList.remove('isActive');
    menuIcon.setAttribute('aria-expanded', 'false');
};

function updateActiveLink() {
    const sections = document.querySelectorAll('section');

    sections.forEach((sec) => {
        const top = window.scrollY;
        const offSet = sec.offsetTop - 150;
        const height = sec.offsetHeight;
        const id = sec.getAttribute('id');

        if (top >= offSet && top < offSet + height) {
            navLinks.forEach((link) => {
                link.classList.remove('isActive');

                // Add active class only to the current section's nav link
                if (link.getAttribute('href').includes(id)) {
                    link.classList.add('isActive');
                }
            });
        }
    });
}

window.addEventListener(
    'scroll',
    () => {
        if (isTicking) return;

        isTicking = true;
        window.requestAnimationFrame(() => {
            updateActiveLink();
            isTicking = false;
        });
    },
    { passive: true }
);

// Highlight nav link on click
navLinks.forEach((link) => {
    link.addEventListener('click', () => {
        navLinks.forEach((l) => l.classList.remove('isActive'));
        link.classList.add('isActive');
        closeMenu();
    });
});

// Toggle navbar visibility (for mobile menu)
menuIcon.addEventListener('click', () => {
    navbar.classList.toggle('isActive');
    menuIcon.setAttribute('aria-expanded', navbar.classList.contains('isActive') ? 'true' : 'false');
});

desktopBreakpoint.addEventListener('change', (event) => {
    if (event.matches) {
        closeMenu();
    }
});

document.addEventListener('click', (event) => {
    if (!navbar.classList.contains('isActive')) return;

    if (!navbar.contains(event.target) && !menuIcon.contains(event.target)) {
        closeMenu();
    }
});

updateActiveLink();
