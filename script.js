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
        showSlides(slideIndex, carousel);

        // Bind events
        const prevBtn = carousel.querySelector('.prev');
        const nextBtn = carousel.querySelector('.next');
        const dots = carousel.querySelectorAll('.dot');

        if (prevBtn) prevBtn.onclick = () => showSlides(slideIndex -= 1, carousel);
        if (nextBtn) nextBtn.onclick = () => showSlides(slideIndex += 1, carousel);

        dots.forEach((dot, dotIndex) => {
            dot.onclick = () => showSlides(slideIndex = dotIndex + 1, carousel);
        });

        // Internal function to show slides for this specific carousel instance
        function showSlides(n, container) {
            let i;
            let slides = container.getElementsByClassName("carousel-slide");
            let dots = container.getElementsByClassName("dot");

            if (n > slides.length) { slideIndex = 1 }
            if (n < 1) { slideIndex = slides.length }

            for (i = 0; i < slides.length; i++) {
                slides[i].classList.remove('active');
            }
            for (i = 0; i < dots.length; i++) {
                dots[i].classList.remove('active-dot');
            }

            if (slides[slideIndex - 1]) slides[slideIndex - 1].classList.add('active');
            if (dots[slideIndex - 1]) dots[slideIndex - 1].classList.add('active-dot');
        }
    });
}
