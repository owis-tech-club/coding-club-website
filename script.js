const navbar = document.getElementById('navbar');
document.addEventListener('DOMContentLoaded', () => {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    function scrollToSection(sectionId) {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    window.scrollToSection = scrollToSection;

    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navOverlay = document.getElementById('navOverlay');

    if (mobileMenuBtn && navOverlay) {
        const navLinksContainer = mobileMenuBtn.closest('.nav-container').querySelector('.nav-links');

        mobileMenuBtn.addEventListener('click', () => {
            const isOpen = navLinksContainer.classList.toggle('mobile-active');
            navOverlay.classList.toggle('active', isOpen);
        });

        navOverlay.addEventListener('click', () => {
            navLinksContainer.classList.remove('mobile-active');
            navOverlay.classList.remove('active');
        });

        navLinksContainer.querySelectorAll('.nav-link, .web-link').forEach(link => {
            link.addEventListener('click', () => {
                navLinksContainer.classList.remove('mobile-active');
                navOverlay.classList.remove('active');
            });
        });
    }
    let resizeTimer;
    window.addEventListener('resize', () => {
        document.body.classList.add('no-transition');
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            document.body.classList.remove('no-transition');
        }, 300);
    });
});