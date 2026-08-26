/**
 * ========================================
 * Forms Module
 * example.com
 * ========================================
 */

document.addEventListener('DOMContentLoaded', () => {
    initForms();
    // Note: initAccordions is handled in main.js
});


/**
 * Initialize form validation and submission
 */
function initForms() {
    const forms = document.querySelectorAll('form[data-validate]');

    forms.forEach(form => {
        // Anti-spam: Only allow submission if user has interacted
        let userInteracted = false;
        const interactionEvents = ['mousemove', 'keydown', 'touchstart', 'scroll'];

        const setInteracted = () => {
            userInteracted = true;
            interactionEvents.forEach(e => window.removeEventListener(e, setInteracted));
        };
        interactionEvents.forEach(e => window.addEventListener(e, setInteracted, { passive: true }));

        // Real-time email validation
        const emailInput = form.querySelector('input[type="email"]');
        if (emailInput) {
            emailInput.addEventListener('blur', () => validateEmail(emailInput));
            emailInput.addEventListener('input', () => clearError(emailInput));
        }

        // Form submission
        form.addEventListener('submit', (e) => {
            if (!userInteracted) {
                e.preventDefault();
                console.log('Bot detected or no interaction');
                return;
            }
            handleFormSubmit(e);
        });
    });
}

/**
 * Handle form submission
 * @param {Event} e - Submit event
 */
async function handleFormSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn?.textContent;

    // Validate all required fields
    if (!validateForm(form)) return;

    // Show loading state
    if (submitBtn) {
        submitBtn.textContent = 'Envoi en cours...';
        submitBtn.disabled = true;
    }

    try {
        const formData = new FormData(form);
        const response = await fetch(form.action || 'nodemailer.php', {
            method: 'POST',
            body: formData
        });

        const result = await response.json();

        if (result.success) {
            showFormSuccess(form);
        } else {
            throw new Error(result.message || 'Erreur lors de l\'envoi');
        }
    } catch (error) {
        showFormError(form, error.message);
        if (submitBtn) {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    }
}

/**
 * Validate entire form
 * @param {HTMLFormElement} form - Form to validate
 * @returns {boolean} Is valid
 */
function validateForm(form) {
    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');

    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            showError(field, 'Ce champ est requis');
            isValid = false;
        } else if (field.type === 'email' && !isValidEmail(field.value)) {
            showError(field, 'Email invalide');
            isValid = false;
        }
    });

    return isValid;
}

/**
 * Validate email input
 * @param {HTMLInputElement} input - Email input
 */
function validateEmail(input) {
    if (input.value && !isValidEmail(input.value)) {
        showError(input, 'Email invalide');
    } else if (input.value) {
        showSuccess(input);
    }
}

/**
 * Check if email is valid
 * @param {string} email - Email to validate
 * @returns {boolean} Is valid
 */
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Show error on input
 * @param {HTMLElement} input - Input element
 * @param {string} message - Error message
 */
function showError(input, message) {
    input.classList.add('error');
    input.classList.remove('success');

    // Add error message
    let errorEl = input.parentElement.querySelector('.form-error');
    if (!errorEl) {
        errorEl = document.createElement('span');
        errorEl.className = 'form-error';
        input.parentElement.appendChild(errorEl);
    }
    errorEl.textContent = message;
}

/**
 * Show success on input
 * @param {HTMLElement} input - Input element
 */
function showSuccess(input) {
    input.classList.remove('error');
    input.classList.add('success');

    const errorEl = input.parentElement.querySelector('.form-error');
    if (errorEl) errorEl.remove();
}

/**
 * Clear error from input
 * @param {HTMLElement} input - Input element
 */
function clearError(input) {
    input.classList.remove('error');
    const errorEl = input.parentElement.querySelector('.form-error');
    if (errorEl) errorEl.remove();
}

/**
 * Show form success message
 * @param {HTMLFormElement} form - Form element
 */
function showFormSuccess(form) {
    form.innerHTML = `
    <div class="form-success text-center py-12">
      <div class="text-success text-5xl mb-4">✓</div>
      <h3 class="text-2xl font-bold mb-2">Merci!</h3>
      <p>Votre message a été envoyé avec succès. Nous vous répondrons sous peu.</p>
    </div>
  `;
}

/**
 * Show form error message
 * @param {HTMLFormElement} form - Form element
 * @param {string} message - Error message
 */
function showFormError(form, message) {
    const existingError = form.querySelector('.form-error-global');
    if (existingError) existingError.remove();

    const errorDiv = document.createElement('div');
    errorDiv.className = 'form-error-global bg-error text-white p-4 rounded-lg mb-4';
    errorDiv.textContent = message || 'Une erreur s\'est produite. Veuillez réessayer.';
    form.prepend(errorDiv);
}

// Export for external use
window.validateForm = validateForm;
// window.initAccordions is now defined in main.js
