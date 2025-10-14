import { getIntersectionObserver, useTransitionDelay } from "../../common/helpers";
import { isNoAnimations } from "../../common/performance";

import './style.scss';

export const useContactLocations = () => {
    const block = document.querySelector('.hero--contact');
    if (!block) {
        return;
    }

    if (isNoAnimations()) {
        block.classList.add("appeared");
        return;
    }

    const locations = block.querySelectorAll(".contact__locations-positions");

    locations.forEach((location, index) => {
        location.style.setProperty("--delay", `${index * 0.2}s`);
    });

    block.classList.add("transition");

    const observer = getIntersectionObserver(0, onIntersecting);
    useTransitionDelay(() => observer.observe(block));

    return () => observer.disconnect();

    function onIntersecting() {
        block.classList.add("appeared");
        observer.disconnect();
    }
};
