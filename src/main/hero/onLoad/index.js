import { isLoaded } from "../../../initial";
import { PRELOADER_REMOVED_EVENT_NAME } from "../../../global/preloader";
import { setTextBlur } from "../../../common/textBlur";

import './style.scss';

export const useHeroLoadAnimation = () => {
    if (isLoaded()) {
        return;
    }

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

    document.addEventListener(PRELOADER_REMOVED_EVENT_NAME, animate);
    let timeout;

    return () => {
        document.removeEventListener(PRELOADER_REMOVED_EVENT_NAME, animate);
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