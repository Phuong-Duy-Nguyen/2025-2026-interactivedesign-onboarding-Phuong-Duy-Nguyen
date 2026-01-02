import lottie from 'lottie-web';
import discover from './discover.json';
import shopping from './shopping.json';
import payment from './payment.json';
import driver from './driver.json';
import receiving from './receiving.json';
import tracking from './tracking.json';


// Animaties en content per slide
const slides = [
    {
        type: "intro",
        title: "Welcome to Bolt Food",
        text: "Fast, fresh food delivered straight to your door."
    },
    { animation: discover, title: "Discover local food", text: "Taste the flavours of the world with our wide selection of restaurants" },
    { animation: shopping, title: "Add to cart & place your order", text: "Tap, tap, done! Place the order with just a few clicks" },
    { animation: payment, title: "Safe checkout & order confirmed", text: "Paid & confirmed - your meal is being prepared." },
    { animation: driver, title: "On the way!", text: "Your courier is heading to you with your fresh, hot meal." },
    { animation: tracking, title: "Tracking Notification", text: "Your courier is just around the corner with your food." },
    { animation: receiving, title: "Food Has Arrived", text: "Your order has arrived — time to dig in!" },
];

let currentSlide = 0;
const container = document.querySelector('.js-lottie');
const htmlTitle = document.querySelector('.js-title');
const htmlText = document.querySelector('.js-text');
const htmlNextBtn = document.querySelector('.js-next');
const htmlBackBtn = document.querySelector('.js-back');
const htmlDots = document.querySelectorAll('.c-onboarding__dot');

// Laad initiële animatie
let anim = lottie.loadAnimation({
    container,
    renderer: 'svg',
    loop: false,
    autoplay: true,
    animationData: slides[currentSlide].animation,
});

// Update progress dots
const updateDots = (index) => {
    htmlDots.forEach((htmlDots, i) => {
        htmlDots.classList.toggle('c-onboarding__dot--active', i === index);
    });
}

// Update button text, class en action
const updateButton = () => {
    if (currentSlide === slides.length - 1) {
        // Laatste slide → rechthoekige Explore Food knop
        htmlNextBtn.innerHTML = "Explore Food";  // tekst ipv SVG
        htmlNextBtn.classList.add('c-onboarding__next--explore');
        htmlNextBtn.onclick = () => {
            alert("Let's start exploring!");
        };
    } else {
        // Normale ronde knop met SVG
        htmlNextBtn.innerHTML = '<img class="c-onboarding__nexticon" src="./img/arrow-right-short.svg" alt="arrow" />';
        htmlNextBtn.classList.remove('c-onboarding__next--explore');
        htmlNextBtn.onclick = nextSlide;
    }
}


// Functie: naar volgende slide
const nextSlide = () => {
    fadeOut(() => {
        currentSlide++;
        if (currentSlide >= slides.length) currentSlide = slides.length - 1;
        loadSlide();
    });
}

// Functie: naar vorige slide
const prevSlide = () => {
    if (currentSlide === 0) return;
    fadeOut(() => {
        currentSlide--;
        loadSlide();
    });
}

// Fade-out animatie voor container, titel en tekst
const fadeOut = (callback) => {
    container.style.transition = 'opacity 0.5s';
    htmlTitle.style.transition = 'opacity 0.5s';
    htmlText.style.transition = 'opacity 0.5s';

    container.style.opacity = 0;
    htmlTitle.style.opacity = 0;
    htmlText.style.opacity = 0;

    setTimeout(callback, 500); // match de transition-duration
}

// Laad de huidige slide
const loadSlide = () => {
    anim.destroy();

    anim = lottie.loadAnimation({
        container,
        renderer: 'svg',
        loop: false,
        autoplay: true,
        animationData: slides[currentSlide].animation,
    });

    htmlTitle.textContent = slides[currentSlide].title;
    htmlText.textContent = slides[currentSlide].text;
    updateDots(currentSlide);

    // Fade-in
    container.style.opacity = 1;
    htmlTitle.style.opacity = 1;
    htmlText.style.opacity = 1;

    // Update knop
    updateButton();
}

// Back button
htmlBackBtn.addEventListener('click', prevSlide);

// Init
updateButton();
