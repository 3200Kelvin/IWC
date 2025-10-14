import { getIntersectionObserver, useTransitionDelay, getCleanup } from "../../common/helpers";
import { isNoAnimations } from "../../common/performance";

import './style.scss';

export const useAboutHero = () => {
    const block = document.querySelector('.about-hero');

    if (!block) {
        return;
    }

    const logo = block.querySelector('.about-hero__logo');

    if (!logo) {
        return;
    }

    if (isNoAnimations()) {
        logo.classList.add('shown');
        return;
    }

    setTimeout(() => {
        logo.classList.add('transition');
    }, 50);

    const observer = getIntersectionObserver(0, onIntersecting);
    const transitionDelayClaenup = useTransitionDelay(() => observer.observe(logo));

    return getCleanup(
        transitionDelayClaenup,
        () => observer.disconnect(),
    );

    function onIntersecting(entry, observer) {
        entry.target.classList.add('shown');
        observer.disconnect();
    }
};
