"use strict";

let effectTriggered = false;

function abilitiesEffect() {
  if (effectTriggered) return;

  let skills = document.getElementById("skills");
  let distanciaSkills = window.innerHeight - skills.getBoundingClientRect().top;

  if (distanciaSkills >= 300) {
    effectTriggered = true;

    const classes = [
      "javascript",
      "react",
      "html5",
      "css",
      "nextjs",
      "git",
      "comunication",
      "teamWork",
      "emotionalIntelligence",
      "adaptability",
      "problemSolving",
      "patience",
    ];

    let abilities = Array.from(
      document.getElementsByClassName("skill__progress")
    );

    abilities.forEach((elem, i) => {
      if (i < classes.length) {
        elem.classList.add(classes[i]);
      }
    });
  }
}

window.addEventListener("scroll", abilitiesEffect);
