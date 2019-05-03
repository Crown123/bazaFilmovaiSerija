const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        // Toggle Nav
        nav.classList.toggle('nav-active');

        //Animate links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        // apply the animation but make sure the
        // positioning doesnt change when viewport changes
        if (nav.classList.contains("nav-active")) {
            nav.style.animation = `navSlide 0.5s ease`;
        } else {
            nav.style.animation = `navSlideOut 0.5s ease`;
        }

        //Burger animation
        burger.classList.toggle('toggle');
    });

}

navSlide();