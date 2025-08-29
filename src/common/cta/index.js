import { isHover, getIntersectionObserver } from "../../common/helpers";

import './style.scss';

export const useCtaButtons = () => {
    if (isHover) {
        return;
    }

    const buttons = document.querySelectorAll('.cta__button');
    if (!buttons?.length) {
        return;
    }

    const observer = getIntersectionObserver(40, onIntersecting, onNotIntersecting);

    buttons.forEach((button) => {
        const label = button.querySelector('.cta__button__label');
        label.button = button;
        observer.observe(label);
    });

    return () => observer.disconnect();

    function onIntersecting(entry) {
        entry.target.button.classList.add('active');
    }

    function onNotIntersecting(entry) {
        entry.target.button.classList.remove('active');
    }
};
