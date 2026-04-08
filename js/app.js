'use strict';

const criticalSections = ['header', 'home', 'about'];
const deferredSections = ['skills', 'curriculum', 'projects', 'reviews', 'contact', 'footer'];
const sectionScripts = new Map([
    ['header', 'js/header.js'],
    ['reviews', 'js/reviews.js']
]);
const loadedScripts = new Set();

function runWhenIdle(callback) {
    if ('requestIdleCallback' in window) {
        window.requestIdleCallback(callback, { timeout: 1200 });
        return;
    }

    window.setTimeout(callback, 0);
}

async function loadScript(src) {
    if (!src || loadedScripts.has(src)) return;

    const existingScript = document.querySelector(`script[src="${src}"]`);
    if (existingScript) {
        loadedScripts.add(src);
        return;
    }

    await new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.defer = true;
        script.addEventListener('load', resolve, { once: true });
        script.addEventListener('error', reject, { once: true });
        document.body.appendChild(script);
    });

    loadedScripts.add(src);
}

async function loadSection(section) {
    const container = document.getElementById(`${section}-root`);
    if (!container) return;

    container.setAttribute('aria-busy', 'true');

    const response = await fetch(`sections/${section}.html`);
    if (!response.ok) {
        throw new Error(`No se pudo cargar sections/${section}.html`);
    }

    container.innerHTML = await response.text();
    container.removeAttribute('aria-busy');

    const relatedScript = sectionScripts.get(section);
    if (relatedScript) {
        await loadScript(relatedScript);
    }
}

async function loadSections(sections) {
    await Promise.all(
        sections.map((section) =>
            loadSection(section).catch((error) => {
                console.error(`Error cargando ${section}:`, error);
            })
        )
    );
}

document.addEventListener('DOMContentLoaded', async () => {
    await loadSections(criticalSections);

    runWhenIdle(async () => {
        await loadSections(deferredSections);
        document.dispatchEvent(new CustomEvent('sections:loaded'));
    });
});
