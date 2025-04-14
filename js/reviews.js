"use strict";

document.addEventListener("DOMContentLoaded", () => {
  // Cargar el archivo JSON que contiene los datos de los testimonios
  fetch("../data/reviews.json")
    .then((response) => response.json())
    .then((data) => {
      // Seleccionar el contenedor donde se van a agregar las tarjetas
      const reviewsContainer = document.getElementById("reviews__container");

      // Limpiar el contenedor antes de agregar nuevas tarjetas
      reviewsContainer.innerHTML = "";

      // Iterar sobre los datos y crear una tarjeta para cada uno
      data.forEach((review) => {
        // Crear el contenedor de la tarjeta
        const reviewItem = document.createElement("div");
        reviewItem.classList.add("reviews__item");

        // Crear la imagen
        const img = document.createElement("img");
        img.classList.add("reviews__item-img");
        img.src = review.image;
        img.alt = review.name;

        // Crear el título
        const title = document.createElement("h2");
        title.classList.add("reviews__item-title");
        title.textContent = review.name;

        // Crear la calificación (estrellas)
        // const rating = document.createElement("div");
        // rating.classList.add("reviews__item-rating");
        // for (let i = 0; i < review.rating; i++) {
        //   const star = document.createElement("i");
        //   star.classList.add("star");
        //   rating.appendChild(star);
        // }

        // Crear la descripción
        const description = document.createElement("p");
        description.classList.add("reviews__item-description");
        description.textContent = review.description;

        // Agregar todos los elementos a la tarjeta
        reviewItem.appendChild(img);
        reviewItem.appendChild(title);
        reviewItem.appendChild(rating);
        reviewItem.appendChild(description);

        // Agregar la tarjeta al contenedor
        reviewsContainer.appendChild(reviewItem);
      });
    })
    .catch((error) => {
      console.error("Error cargando el archivo JSON:", error);
    });
});
