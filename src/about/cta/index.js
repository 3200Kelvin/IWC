import { isHover, getIsLeastMobile, getIntersectionObserver } from "../../common/helpers";

import './style.scss';

export const useCtaButtons = () => {
    if (isHover) {
        return;
    }

    const buttons = document.querySelector('.cta__buttons');
    if (!buttons) {
        return;
    }

    const button = {
        left: buttons.querySelector('.cta__button--left'),
        right: buttons.querySelector('.cta__button--right')
    };

    if (getIsLeastMobile()) {
        const observer = getIntersectionObserver(45, onIntersecting, onNotIntersecting);
        observer.observe(button.left);
        observer.observe(button.right);

        return () => observer.disconnect();
    } else {
        const observerRight = getIntersectionObserver(0, onIntersecting, onNotIntersecting, { marginTop: 43, marginBottom: 47 });
        const observerLeft = getIntersectionObserver(0, onIntersecting, onNotIntersecting, { marginTop: 47, marginBottom: 51 });

        observerRight.observe(button.right);
        observerLeft.observe(button.left);

        return () => {
            observerRight.disconnect();
            observerLeft.disconnect();
        };
    }

    function onIntersecting(entry) {
        entry.target.classList.add('active');
    }

    function onNotIntersecting(entry) {
        entry.target.classList.remove('active');
    }
};
