"use strict";

// dynamically loads HTML sections and their JS files
document.addEventListener("DOMContentLoaded", () => {
  const sections = [
    "home",
    "header",
    "about",
    "curriculum",
    "skills",
    "projects",
    "reviews",
    "contact",
    "footer",
  ];

  sections.forEach((section) => {
    fetch(`sections/${section}.html`)
      .then((res) => res.text())
      .then((html) => {
        document.getElementById(section).innerHTML = html;

        // load corresponding JS files
        const script = document.createElement("script");
        // adjust the path if needed
        script.src = `js/${section}.js`;
        script.defer = true;
        document.body.appendChild(script);
      })
      .catch((err) => console.error(`Error cargando ${section}:`, err));
  });
});
