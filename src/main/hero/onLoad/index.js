import { isLoaded } from "../../../initial";
import { PRELOADER_REMOVED_EVENT_NAME } from "../../../global/preloader";

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

    const menuBtn = document.querySelector('.menu-btn');
    const logo = document.querySelector('.fixed__logo__link');

    hero.classList.add('initial');
    logo.classList.add('initial');
    menuBtn.classList.add('initial');

    document.addEventListener(PRELOADER_REMOVED_EVENT_NAME, animate);

    function animate() {
        hero.classList.add('transition');
        logo.classList.add('transition');
        menuBtn.classList.add('transition');

        setTimeout(() => {
            hero.classList.remove('initial');
            logo.classList.remove('initial');
            
            setTimeout(() => {
                menuBtn.classList.remove('initial', 'transition');
            }, ANIMATION_TIME * 1000);
        }, 50)
    }
}