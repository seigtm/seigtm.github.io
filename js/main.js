document.addEventListener('DOMContentLoaded', () => {
    const mainNav = document.getElementById('main-nav');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.section');
    const pdfButton = document.getElementById('download-pdf-btn');

    if (pdfButton) {
        pdfButton.addEventListener('click', () => {
            // Get current language and open appropriate PDF
            const currentLang = window.getCurrentLanguage ? window.getCurrentLanguage() : 'ru';
            const pdfPath = `src/resume_${currentLang}.pdf`;
            window.open(pdfPath, '_blank');
        });
    }

    // Function to add 'scrolled' class to navigation on scroll
    const toggleNavClass = () => {
        if (window.scrollY > 50) {
            mainNav.classList.add('scrolled');
        } else {
            mainNav.classList.remove('scrolled');
        }
    };

    // Handle scroll event for navigation
    window.addEventListener('scroll', toggleNavClass);
    toggleNavClass(); // Initial call on page load

    // Toggle mobile navigation
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when nav item is clicked
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Active navigation item on scroll
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const id = entry.target.getAttribute('id');
            const navItem = document.querySelector(`.nav-item[href="#${id}"]`);

            if (entry.isIntersecting) {
                document.querySelectorAll('.nav-item').forEach(item => {
                    item.classList.remove('active');
                });
                if (navItem) {
                    navItem.classList.add('active');
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 60, // Account for navigation height
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animation on scroll
    const animateOnScroll = () => {
        const elementsToAnimate = document.querySelectorAll('.project-card, .highlight-box, .timeline-item, .skill-item, .education-card');

        elementsToAnimate.forEach(element => {
            const position = element.getBoundingClientRect();

            // Element is visible in viewport
            if (position.top < window.innerHeight * 0.9) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Initialize animations
    document.addEventListener('scroll', animateOnScroll);

    // Call animation function on page load
    window.addEventListener('load', animateOnScroll);

    // Initialize CSS for animations
    const styleElement = document.createElement('style');
    styleElement.innerHTML = `
        .project-card, .highlight-box, .timeline-item, .skill-item, .education-card {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }

        .timeline-item:nth-child(1) { transition-delay: 0.1s; }
        .timeline-item:nth-child(2) { transition-delay: 0.2s; }
        .timeline-item:nth-child(3) { transition-delay: 0.3s; }
        .timeline-item:nth-child(4) { transition-delay: 0.4s; }

        .highlight-box:nth-child(1) { transition-delay: 0.1s; }
        .highlight-box:nth-child(2) { transition-delay: 0.2s; }
        .highlight-box:nth-child(3) { transition-delay: 0.3s; }
        .highlight-box:nth-child(4) { transition-delay: 0.4s; }

        .project-card:nth-child(1) { transition-delay: 0.1s; }
        .project-card:nth-child(2) { transition-delay: 0.2s; }
        .project-card:nth-child(3) { transition-delay: 0.3s; }
    `;
    document.head.appendChild(styleElement);

    // Initialize language manager
    initLanguageManager();
});
