'use strict';

// Prevents the effect from being triggered multiple times
let effectTriggered = false;

// Function that activates the animation or class effect when scrolling
function abilitiesEffect() {
    // If the effect has already been triggered, do nothing
    if (effectTriggered) return;

    // Get the element that contains the skills section
    let skills = document.getElementById('skills');

    // Calculate the distance from the top of the viewport to the skills section
    let distanciaSkills = window.innerHeight - skills.getBoundingClientRect().top;

    // If the section is within 300px of the viewport, trigger the effect
    if (distanciaSkills >= 300) {
        effectTriggered = true;

        // Array of CSS classes to add to each skill bar for animation or styling
        const classes = [
            'javascript',
            'react',
            'html5',
            'css',
            'nextjs',
            'git',
            'comunication',
            'teamWork',
            'emotionalIntelligence',
            'adaptability',
            'problemSolving',
            'patience',
        ];

        // Convert HTMLCollection to array for easier manipulation
        let abilities = Array.from(document.getElementsByClassName('skill__progress'));

        // Loop through each skill bar and assign the corresponding class
        abilities.forEach((elem, i) => {
            if (i < classes.length) {
                elem.classList.add(classes[i]);
            }
        });
    }
}

window.addEventListener('scroll', abilitiesEffect);
