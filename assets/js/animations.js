/**
 * ========================================
 * Animations Module
 * example.com
 * ========================================
 */

/**
 * Smooth scroll to element
 * @param {string} selector - Element selector
 */
function smoothScrollTo(selector) {
    const element = document.querySelector(selector);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Handle anchor links smooth scroll
document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (link) {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        if (targetId !== '#') {
            smoothScrollTo(targetId);
        }
    }
});

// Export for external use
window.smoothScrollTo = smoothScrollTo;
