"use strict";

let effectTriggered = false;

function abilitiesEffect() {
  if (effectTriggered) return;

  let skillsSection = document.getElementById("skills");
  if (!skillsSection) return;

  let distancia =
    window.innerHeight - skillsSection.getBoundingClientRect().top;

  // Si la sección está a 300px de entrar o ya entró
  if (distancia >= 300) {
    effectTriggered = true;

    let bars = document.querySelectorAll(".skill__progress");

    bars.forEach((bar) => {
      // 1. Guardamos el valor que pusiste en el HTML (ej: "95%")
      let targetWidth = bar.style.width;

      // 2. IMPORTANTE: Forzamos el ancho a 0 inmediatamente
      bar.style.width = "0px";

      // 3. Esperamos 150ms. Esto garantiza que veas la animación
      setTimeout(() => {
        bar.style.width = targetWidth;
      }, 150);
    });
  }
}

window.addEventListener("scroll", abilitiesEffect);
// Ejecutamos al cargar por si el usuario ya está posicionado en esa parte
window.addEventListener("load", abilitiesEffect);
