/**
 * ========================================
 * Navigation Module
 * example.com
 * ========================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
});

/**
 * Initialize navigation functionality
 */
function initNavigation() {
  const header = document.querySelector('.header');
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileOverlay = document.querySelector('.mobile-overlay');
  const mobileLinks = document.querySelectorAll('.mobile-menu .nav-link');
  const mobileBtn = document.querySelector('.mobile-menu .btn');

  // Scroll behavior - add scrolled class
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  // Mobile menu toggle
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMobileMenu();
    });
  }

  // Close menu on overlay click
  if (mobileOverlay) {
    mobileOverlay.addEventListener('click', () => {
      closeMobileMenu();
    });
  }

  // Close menu on link click - DON'T prevent default so links work
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMobileMenu();
      // Link will navigate naturally
    });
  });

  // Close menu on mobile button click - DON'T prevent default
  if (mobileBtn) {
    mobileBtn.addEventListener('click', () => {
      closeMobileMenu();
      // Link/button will work naturally
    });
  }

  // Close menu on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu?.classList.contains('open')) {
      closeMobileMenu();
    }
  });
}

/**
 * Toggle mobile menu open/close
 */
function toggleMobileMenu() {
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileOverlay = document.querySelector('.mobile-overlay');

  const isOpen = mobileMenu?.classList.contains('open');

  if (isOpen) {
    closeMobileMenu();
  } else {
    menuToggle?.classList.add('active');
    menuToggle?.setAttribute('aria-expanded', 'true');
    mobileMenu?.classList.add('open');
    mobileOverlay?.classList.add('active');
    document.body.classList.add('menu-open');
  }
}

/**
 * Close mobile menu
 */
function closeMobileMenu() {
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileOverlay = document.querySelector('.mobile-overlay');

  menuToggle?.classList.remove('active');
  menuToggle?.setAttribute('aria-expanded', 'false');
  mobileMenu?.classList.remove('open');
  mobileOverlay?.classList.remove('active');
  document.body.classList.remove('menu-open');
}

// Export functions for external use
window.toggleMobileMenu = toggleMobileMenu;
window.closeMobileMenu = closeMobileMenu;
