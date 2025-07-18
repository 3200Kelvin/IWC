import { setTextBlur } from "../../../common/textBlur";
import { onPageTransitionEnd } from "../../../global/transitions";

import './style.scss';

export const useHeroLoadAnimation = () => {
    const hero = document.querySelector('.hero');
    if (!hero) {
        return;
    }

    const ANIMATION_TIME = 1.6;

    const title = hero.querySelector('.heading--h1');
    const tagline = hero.querySelector('.hero__tagline p');
    const menuBtn = document.querySelector('.menu-btn');
    const logo = document.querySelector('.fixed__logo__link');

    hero.classList.add('initial');
    logo.classList.add('initial');
    menuBtn.classList.add('initial');

    SplitText.create(title, {
        type: "words",
    });
    const { animate: animateTagline, cleanup: cleanupTagline } = setTextBlur(tagline);

    const cleanupPageListener = onPageTransitionEnd(animate);
    let timeout;

    return () => {
        cleanupPageListener?.();
        cleanupTagline?.();
        if (timeout) {
            clearTimeout(timeout);
            timeout = null;
        }
    }

    function animate() {
        hero.classList.add('transition');
        logo.classList.add('transition');
        menuBtn.classList.add('transition');

        timeout = setTimeout(() => {
            hero.classList.remove('initial');
            logo.classList.remove('initial');

            timeout = setTimeout(() => {
                animateTagline();
            
                timeout = setTimeout(() => {
                    hero.classList.remove('transition');
                    menuBtn.classList.remove('initial', 'transiiton');
                }, ANIMATION_TIME * 500);
            }, ANIMATION_TIME * 500);
        }, 50)
    }
}