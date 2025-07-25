import { getIntersectionObserver, useTransitionDelay, getCleanup } from "../../common/helpers";

import './style.scss';

export const useAboutHero = () => {
    const block = document.querySelector('.about-hero');

    if (!block) {
        return;
    }

    const logo = block.querySelector('.about-hero__logo');

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
