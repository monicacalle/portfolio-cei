'use strict';

// dynamically loads HTML sections and their JS files
document.addEventListener('DOMContentLoaded', () => {
    const sections = ['home', 'header', 'about', 'curriculum', 'skills', 'projects', 'reviews', 'contact', 'footer'];
    const sectionScripts = new Set(['header', 'projects', 'reviews', 'skills']);

    Promise.all(
        sections.map((section) =>
            fetch(`sections/${section}.html`)
            .then((res) => res.text())
            .then((html) => {
                document.getElementById(section).innerHTML = html;

                if (sectionScripts.has(section)) {
                    const script = document.createElement('script');
                    script.src = `js/${section}.js`;
                    script.defer = true;
                    document.body.appendChild(script);
                }
            })
            .catch((err) => console.error(`Error cargando ${section}:`, err))
        )
    ).then(() => {
        document.dispatchEvent(new CustomEvent('sections:loaded'));
    });
});
