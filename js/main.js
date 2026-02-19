/* ============================================================
   RIVERSIDE DRIVE LTD — Clean Interactions
   ============================================================ */

(function () {
    'use strict';

    const GOOGLE_SHEETS_URL = ''; // Paste your Apps Script URL here

    document.addEventListener('DOMContentLoaded', () => {
        initTheme();
        initNav();
        initCarousel();
        initReveal();
        initForm();
        initSmoothScroll();
    });

    /* ---- Theme Toggle ---- */
    function initTheme() {
        const themeToggle = document.getElementById('themeToggle');
        const savedTheme = localStorage.getItem('theme') || 'light';
        
        // Apply saved theme on load
        document.documentElement.setAttribute('data-theme', savedTheme);
        
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                const currentTheme = document.documentElement.getAttribute('data-theme');
                const newTheme = currentTheme === 'light' ? 'dark' : 'light';
                
                document.documentElement.setAttribute('data-theme', newTheme);
                localStorage.setItem('theme', newTheme);
            });
        }
    }

    /* ---- Navigation ---- */
    function initNav() {
        const nav = document.getElementById('nav');
        const burger = document.getElementById('navBurger');
        const mobMenu = document.getElementById('mobMenu');
        const mobLinks = document.querySelectorAll('.mob-menu__link');

        // Scroll class
        window.addEventListener('scroll', () => {
            nav.classList.toggle('nav--scrolled', window.scrollY > 50);
        }, { passive: true });

        // Burger toggle
        if (burger && mobMenu) {
            burger.addEventListener('click', () => {
                burger.classList.toggle('open');
                mobMenu.classList.toggle('open');
                document.body.style.overflow = mobMenu.classList.contains('open') ? 'hidden' : '';
            });

            mobLinks.forEach(link => {
                link.addEventListener('click', () => {
                    burger.classList.remove('open');
                    mobMenu.classList.remove('open');
                    document.body.style.overflow = '';
                });
            });
        }
    }

    /* ---- Carousel ---- */
    function initCarousel() {
        const track = document.querySelector('.carousel__track');
        const slides = Array.from(document.querySelectorAll('.carousel__slide'));
        const prevBtn = document.querySelector('.carousel__btn--prev');
        const nextBtn = document.querySelector('.carousel__btn--next');
        const indicatorsContainer = document.querySelector('.carousel__indicators');

        if (!track || !slides.length) return;

        let currentIndex = 0;
        const slideCount = slides.length;

        // Create indicators
        slides.forEach((_, index) => {
            const indicator = document.createElement('button');
            indicator.classList.add('carousel__indicator');
            if (index === 0) indicator.classList.add('active');
            indicator.setAttribute('aria-label', `Go to slide ${index + 1}`);
            indicator.addEventListener('click', () => goToSlide(index));
            indicatorsContainer.appendChild(indicator);
        });

        const indicators = Array.from(document.querySelectorAll('.carousel__indicator'));

        function updateCarousel() {
            const offset = -currentIndex * 100;
            track.style.transform = `translateX(${offset}%)`;
            
            // Update indicators
            indicators.forEach((indicator, index) => {
                indicator.classList.toggle('active', index === currentIndex);
            });
        }

        function goToSlide(index) {
            currentIndex = index;
            updateCarousel();
        }

        function nextSlide() {
            currentIndex = (currentIndex + 1) % slideCount;
            updateCarousel();
        }

        function prevSlide() {
            currentIndex = (currentIndex - 1 + slideCount) % slideCount;
            updateCarousel();
        }

        // Event listeners
        if (nextBtn) nextBtn.addEventListener('click', nextSlide);
        if (prevBtn) prevBtn.addEventListener('click', prevSlide);

        // Auto-play
        let autoplayInterval = setInterval(nextSlide, 4000);

        // Pause on hover
        const carouselContainer = document.querySelector('.clients__carousel');
        if (carouselContainer) {
            carouselContainer.addEventListener('mouseenter', () => {
                clearInterval(autoplayInterval);
            });

            carouselContainer.addEventListener('mouseleave', () => {
                autoplayInterval = setInterval(nextSlide, 4000);
            });
        }

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') prevSlide();
            if (e.key === 'ArrowRight') nextSlide();
        });
    }

    /* ---- Scroll Reveal ---- */
    function initReveal() {
        const els = document.querySelectorAll('.reveal');
        if (!els.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -40px 0px'
        });

        els.forEach(el => observer.observe(el));
    }

    /* ---- Contact Form → Google Sheets ---- */
    function initForm() {
        const form = document.getElementById('contactForm');
        const btn = document.getElementById('submitBtn');
        const success = document.getElementById('formSuccess');
        if (!form) return;

        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const data = Object.fromEntries(new FormData(form).entries());
            data.timestamp = new Date().toISOString();

            btn.disabled = true;
            btn.querySelector('span').textContent = 'Sending...';

            try {
                if (GOOGLE_SHEETS_URL) {
                    await fetch(GOOGLE_SHEETS_URL, {
                        method: 'POST',
                        mode: 'no-cors',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(data)
                    });
                }

                form.style.display = 'none';
                success.classList.add('active');

                setTimeout(() => {
                    form.reset();
                    form.style.display = '';
                    success.classList.remove('active');
                    btn.disabled = false;
                    btn.querySelector('span').textContent = 'Send It →';
                }, 5000);

            } catch (err) {
                console.error('Form error:', err);
                btn.disabled = false;
                btn.querySelector('span').textContent = 'Error — Try Again';
                setTimeout(() => {
                    btn.querySelector('span').textContent = 'Send It →';
                }, 3000);
            }
        });
    }

    /* ---- Smooth Scroll ---- */
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(a => {
            a.addEventListener('click', (e) => {
                const target = document.querySelector(a.getAttribute('href'));
                if (!target) return;
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
        });
    }

})();
