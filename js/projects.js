'use strict';

const projectOverlays = document.querySelectorAll('.project__overlay');

projectOverlays.forEach((overlay) => {
    overlay.addEventListener('touchstart', function (e) {
        const opacity = Number(overlay.style.opacity);
        overlay.style.opacity = !opacity ? 1 : 0;
    });
});
