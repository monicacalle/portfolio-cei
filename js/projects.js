"use strict";

const modal = document.getElementById("projectsModal");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const closeModal = document.getElementById("closeModal");
const modalOverlay = document.querySelector(".projects-modal__overlay");
const detailButtons = document.querySelectorAll(".open-modal");

detailButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const card = e.target.closest(".project-card");
    const title = card.dataset.title;
    const description = card.dataset.description;

    modalTitle.textContent = title;
    modalDescription.textContent = description;
    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  });
});

function hideModal() {
  modal.classList.remove("active");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

closeModal.addEventListener("click", hideModal);
modalOverlay.addEventListener("click", hideModal);

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    hideModal();
  }
});
