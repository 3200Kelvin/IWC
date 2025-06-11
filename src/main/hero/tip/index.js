import { getIntersectionObserver } from "../../../common/helpers";

import './style.scss';

export const useHeroTipAnimation = () => {
    const tip = document.querySelector('.hero__tip__content__icon');
    if (!tip) {
        return;
    }

    const observer = getIntersectionObserver(0, startAnimation, stopAnimation);
    observer.observe(tip);

    return () => observer.disconnect();

    function startAnimation() {
        tip.classList.add('animate');
    }

    function stopAnimation() {
        tip.classList.remove('animate');
    }
};
