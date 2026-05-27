// Form Handler
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            // Using Formspree, so we let the default submission happen,
            // or we could use fetch() to submit via AJAX.
            // For now, we will add a simple nice-to-have visual feedback 
            // before the redirect happens.

            const btn = contactForm.querySelector('button[type="submit"]');
            btn.innerHTML = 'Sending...';
            btn.style.opacity = '0.7';

            // Allow default form submission to proceed
            // e.preventDefault();
        });
    }
});
