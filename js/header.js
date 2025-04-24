"use strict";

let menuIcon = document.querySelector(".menu__icon");
let navbar = document.querySelector(".navbar");
let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll(".navbar__link");

// Add active class to nav links based on scroll position
window.addEventListener("scroll", () => {
  sections.forEach((sec) => {
    let top = window.scrollY;
    let offSet = sec.offsetTop - 150;
    let height = sec.offsetHeight;
    let id = sec.getAttribute("id");

    if (top >= offSet && top < offSet + height) {
      navLinks.forEach((link) => {
        link.classList.remove("isActive");

        // Add active class only to the current section's nav link
        if (link.getAttribute("href").includes(id)) {
          link.classList.add("isActive");
        }
      });
    }
  });
});

// Highlight nav link on click
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.forEach((l) => l.classList.remove("isActive"));
    link.classList.add("isActive");
    navbar.classList.remove("isActive");
  });
});

// Toggle navbar visibility (for mobile menu)
menuIcon.addEventListener("click", () => {
  navbar.classList.toggle("isActive");
});
