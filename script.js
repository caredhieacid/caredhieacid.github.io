document.addEventListener('DOMContentLoaded', () => {
    // Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.glass-card, .section-title');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const revealPoint = 150;

        revealElements.forEach(element => {
            const revealTop = element.getBoundingClientRect().top;

            if (revealTop < windowHeight - revealPoint) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            } else {
                element.style.opacity = '0';
                element.style.transform = 'translateY(50px)';
            }
        });
    };

    // Initialize initial styles for transition
    revealElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(50px)';
        element.style.transition = 'all 0.6s ease-out';
    });

    window.addEventListener('scroll', revealOnScroll);

    // Trigger once on load
    revealOnScroll();

    // Console greeting
    console.log('%c Hello there! ', 'background: #66fcf1; color: #0b0c10; font-size: 16px; border-radius: 4px;');

    // Initialize Carousels
    initCarousels();
});

/**
 * Carousel Logic
 */
function initCarousels() {
    const carousels = document.querySelectorAll('.carousel-container');

    carousels.forEach((carousel, index) => {
        let slideIndex = 1;
        const prevBtn = carousel.querySelector('.prev');
        const nextBtn = carousel.querySelector('.next');
        const dots = carousel.querySelectorAll('.dot');
        const slides = carousel.getElementsByClassName("carousel-slide");

        // Guard clause
        if (!slides.length) return;

        // Internal function to show slides
        const showSlides = (n) => {
            if (n > slides.length) { slideIndex = 1 }
            else if (n < 1) { slideIndex = slides.length }
            else { slideIndex = n }

            // Update UI
            for (let i = 0; i < slides.length; i++) {
                slides[i].classList.remove('active');
            }
            if (dots.length > 0) {
                for (let i = 0; i < dots.length; i++) {
                    dots[i].classList.remove('active-dot');
                }
            }

            if (slides[slideIndex - 1]) {
                slides[slideIndex - 1].classList.add('active');
            }
            if (dots.length > 0 && dots[slideIndex - 1]) {
                dots[slideIndex - 1].classList.add('active-dot');
            }
        };

        // Initial show
        showSlides(slideIndex);

        // Auto-play functionality
        let slideInterval;
        const startSlideShow = () => {
            clearInterval(slideInterval);
            slideInterval = setInterval(() => {
                showSlides(slideIndex + 1);
            }, 5000);
        };

        const resetSlideShow = () => {
            clearInterval(slideInterval);
            startSlideShow();
        }

        startSlideShow();

        // Bind events
        if (prevBtn) {
            prevBtn.onclick = (e) => {
                e.preventDefault();
                resetSlideShow();
                showSlides(slideIndex - 1);
            };
        }
        if (nextBtn) {
            nextBtn.onclick = (e) => {
                e.preventDefault();
                resetSlideShow();
                showSlides(slideIndex + 1);
            };
        }

        if (dots.length > 0) {
            dots.forEach((dot, dotIndex) => {
                dot.onclick = (e) => {
                    e.preventDefault();
                    resetSlideShow();
                    showSlides(dotIndex + 1);
                };
            });
        }
    });
}
