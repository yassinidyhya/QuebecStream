/**
 * ========================================
 * Main Entry Point
 * example.com
 * ========================================
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log('example.com initialized');

    // Initialize Lucide icons if available
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // Set current year in footer
    const yearEl = document.querySelector('[data-year]');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    // Active nav link based on current page
    setActiveNavLink();

    // Initialize Accordions
    initAccordions();
});

/**
 * Initialize accordion functionality
 */
function initAccordions() {
    const accordionHeaders = document.querySelectorAll('.accordion-header, .faq-accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', (e) => {
            e.stopPropagation();
            const item = header.parentElement;
            const isOpen = item.classList.contains('active');
            const parent = item.parentElement;

            // Close all accordions in the same parent container (column or list)
            parent.querySelectorAll('.accordion-item, .faq-accordion-item').forEach(acc => {
                acc.classList.remove('active');
                const btn = acc.querySelector('.accordion-header, .faq-accordion-header');
                if (btn) btn.setAttribute('aria-expanded', 'false');
            });

            // Open clicked one if it was closed
            if (!isOpen) {
                item.classList.add('active');
                header.setAttribute('aria-expanded', 'true');
            }
        });
    });
}


// Export functions for external use
window.initAccordions = initAccordions;

/**
 * Set active navigation link based on current page
 */
function setActiveNavLink() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath ||
            (currentPath === '/' && href === 'index.html') ||
            currentPath.endsWith(href)) {
            link.classList.add('active');
        }
    });
}

