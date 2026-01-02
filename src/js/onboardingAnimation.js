import lottie from 'lottie-web';

import discover from './discover.json';
import shopping from './shopping.json';
import payment from './payment.json';
import driver from './driver.json';
import tracking from './tracking.json';
import receiving from './receiving.json';

const slides = [
    {
        type: 'intro',
        title: 'Welcome to Bolt Food',
        text: 'Fast, fresh food delivered straight to your door.'
    },
    {
        type: 'lottie',
        animation: discover,
        title: 'Discover local food',
        text: 'Taste the flavours of the world with our wide selection of restaurants'
    },
    {
        type: 'lottie',
        animation: shopping,
        title: 'Add to cart & place your order',
        text: 'Tap, tap, done! Place the order with just a few clicks'
    },
    {
        type: 'lottie',
        animation: payment,
        title: 'Safe checkout & order confirmed',
        text: 'Paid & confirmed - your meal is being prepared.'
    },
    {
        type: 'lottie',
        animation: driver,
        title: 'On the way!',
        text: 'Your courier is heading to you with your fresh, hot meal.'
    },
    {
        type: 'lottie',
        animation: tracking,
        title: 'Tracking Notification',
        text: 'Your courier is just around the corner.'
    },
    {
        type: 'lottie',
        animation: receiving,
        title: 'Food has arrived',
        text: 'Your order has arrived - time to dig in!'
    }
];

let currentSlide = 0;
let anim = null;

const htmlIntro = document.querySelector('.js-intro');
const htmlLottie = document.querySelector('.js-lottie');
const htmlTitle = document.querySelector('.js-title');
const htmlText = document.querySelector('.js-text');
const htmlNextBtn = document.querySelector('.js-next');
const htmlBackBtn = document.querySelector('.js-back');
const dots = document.querySelectorAll('.js-dot');
const htmlDots = document.querySelector('.js-dots');
const htmlHeader = document.querySelector('.js-header');


const fadeOut = (cb) => {
    [htmlIntro, htmlLottie, htmlTitle, htmlText].forEach(el => {
        el.style.transition = 'opacity .4s';
        el.style.opacity = 0;
    });
    setTimeout(cb, 400);
};

const updateDots = () => {
    const index = Math.max(currentSlide - 1, 0);
    dots.forEach((dot, i) =>
        dot.classList.toggle('c-onboarding__dot--active', i === index)
    );
};

const updateButton = () => {
    if (currentSlide === slides.length - 1) {
        htmlNextBtn.textContent = 'Order Your First Meal';
        htmlNextBtn.classList.add('c-onboarding__next--explore');
        htmlNextBtn.onclick = () => alert("Let's explore!");
    } else {
        htmlNextBtn.innerHTML = '<img class="c-onboarding__nexticon" src="./img/arrow-right-short.svg">';
        htmlNextBtn.classList.remove('c-onboarding__next--explore');
        htmlNextBtn.onclick = nextSlide;
    }
};

const loadSlide = () => {
    const slide = slides[currentSlide];

    htmlIntro.style.display = 'none';
    htmlLottie.style.display = 'block';

    if (slide.type === 'intro') {
        htmlLottie.style.display = 'none';
        htmlIntro.style.display = 'flex';
        htmlDots.classList.add('c-onboarding__dots--invisible');
        htmlHeader.classList.add('u-hidden');
    } else {
        htmlDots.classList.remove('c-onboarding__dots--invisible');
        htmlHeader.classList.remove('u-hidden');
        anim?.destroy();
        anim = lottie.loadAnimation({
            container: htmlLottie,
            renderer: 'svg',
            loop: false,
            autoplay: true,
            animationData: slide.animation
        });
    }

    htmlTitle.textContent = slide.title;
    htmlText.textContent = slide.text;

    htmlBackBtn.style.visibility = currentSlide === 0 ? 'hidden' : 'visible';

    updateDots();
    updateButton();

    [htmlIntro, htmlLottie, htmlTitle, htmlText].forEach(el => el.style.opacity = 1);
};

const nextSlide = () => {
    fadeOut(() => {
        currentSlide++;
        loadSlide();
    });
};

const prevSlide = () => {
    if (currentSlide === 0) return;
    fadeOut(() => {
        currentSlide--;
        loadSlide();
    });
};

htmlBackBtn.addEventListener('click', prevSlide);

loadSlide();
