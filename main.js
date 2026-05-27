document.addEventListener('mousemove', (e) => {
    const layers = document.querySelectorAll('.parallax-layer');

    layers.forEach(layer => {
        const speed = layer.getAttribute('data-speed');
        const x = (window.innerWidth - e.pageX * speed) / 100;
        const y = (window.innerHeight - e.pageY * speed) / 100;

        layer.style.transform = `translateX(${x}px) translateY(${y}px)`;
    });
});

// Header scroll logic
window.addEventListener('scroll', () => {
    const header = document.querySelector('.site-header');
    const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;

    // Also checking pure scroll position for better feel on long pages
    // Hide if scrolled more than 5% OR more than 100px (fallback)
    if (scrollPercentage > 5 || window.scrollY > 100) {
        header.classList.add('header-hidden');
    } else {
        header.classList.remove('header-hidden');
    }
});

// Cookie Banner Logic
document.addEventListener('DOMContentLoaded', () => {
    const banner = document.getElementById('cookie-banner');
    const acceptBtn = document.getElementById('cookie-accept');
    const declineBtn = document.getElementById('cookie-decline');

    // Check if user has already made a choice
    if (!localStorage.getItem('cookieChoice')) {
        // Show banner with a slight delay
        setTimeout(() => {
            banner.style.display = 'block';
        }, 1000);
    }

    acceptBtn.addEventListener('click', () => {
        localStorage.setItem('cookieChoice', 'accepted');
        banner.style.display = 'none';
    });

    declineBtn.addEventListener('click', () => {
        localStorage.setItem('cookieChoice', 'declined');
        banner.style.display = 'none';
    });
});

// Scroll Animation Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target); // Only animate once
        }
    });
}, observerOptions);

document.querySelectorAll('.animate-on-scroll').forEach((element) => {
    observer.observe(element);
});

// Services Sections Interactivity
const serviceItems = document.querySelectorAll('.service-item');
const serviceImages = document.querySelectorAll('.service-image');

serviceItems.forEach(item => {
    item.addEventListener('click', () => {
        // Remove active from all
        serviceItems.forEach(i => i.classList.remove('active'));
        serviceImages.forEach(img => img.classList.remove('active'));

        // Add active to current
        item.classList.add('active');

        // Show corresponding image
        const targetId = item.getAttribute('data-target');
        const targetImage = document.getElementById(targetId);
        if (targetImage) {
            targetImage.classList.add('active');
        }
    });

    // Optional: Hover trigger as well?
    item.addEventListener('mouseenter', () => {
        // Remove active from all
        serviceItems.forEach(i => i.classList.remove('active'));
        serviceImages.forEach(img => img.classList.remove('active'));

        // Add active to current
        item.classList.add('active');

        // Show corresponding image
        const targetId = item.getAttribute('data-target');
        const targetImage = document.getElementById(targetId);
        if (targetImage) {
            targetImage.classList.add('active');
        }
    });
});


// Mobile Menu Logic
const menuToggle = document.querySelector('.mobile-menu-toggle');
const mainNav = document.querySelector('.main-nav');

if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        mainNav.classList.toggle('active');
    });

    // Close menu when clicking a link
    document.querySelectorAll('.main-nav a').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            mainNav.classList.remove('active');
        });
    });
}

// Career Modal Logic
const positionData = {
    mobile: {
        title: 'Mobile App Developer (Android / iOS)',
        experience: '2-4 years',
        skills: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'REST APIs', 'Firebase', 'App Store Deployment']
    },
    frontend: {
        title: 'Frontend Developer',
        experience: '1-3 years',
        skills: ['React.js', 'TypeScript', 'Next.js', 'CSS/SASS', 'Responsive Design', 'Git', 'Accessibility']
    },
    backend: {
        title: 'Backend Developer',
        experience: '2-4 years',
        skills: ['Node.js', 'Python', 'PostgreSQL', 'MongoDB', 'Redis', 'REST/GraphQL APIs', 'Docker']
    },
    designer: {
        title: 'UI/UX Designer',
        experience: '1-3 years',
        skills: ['Figma', 'Adobe XD', 'User Research', 'Wireframing', 'Prototyping', 'Design Systems', 'Accessibility']
    }
};

const modal = document.getElementById('careerModal');
const modalTitle = modal ? modal.querySelector('.modal-title') : null;
const experienceBadge = modal ? modal.querySelector('.experience-badge') : null;
const skillsContainer = modal ? modal.querySelector('.skills-tags') : null;
const applyBtn = document.getElementById('applyBtn');
const closeBtn = modal ? modal.querySelector('.modal-close') : null;

// Open modal when clicking position card
document.querySelectorAll('.position-card[data-position]').forEach(card => {
    card.addEventListener('click', () => {
        const position = card.getAttribute('data-position');
        const data = positionData[position];
        
        if (data && modal) {
            modalTitle.textContent = data.title;
            experienceBadge.textContent = `Experience: ${data.experience}`;
            skillsContainer.innerHTML = data.skills.map(skill => `<span>${skill}</span>`).join('');
            applyBtn.href = `mailto:hr@connectiqo.com?subject=Application for ${encodeURIComponent(data.title)}&body=Hi,%0A%0AI would like to apply for the ${encodeURIComponent(data.title)} position. Please find my resume attached.%0A%0ABest regards`;
            
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });
});

// Close modal
function closeModal() {
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
}

// Close on overlay click
if (modal) {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
}

// Close on ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
        closeModal();
    }
});

