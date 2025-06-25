import { isTouchscreen } from '../../common/helpers';
import { getIntersectionObserver } from '../../common/helpers';

import './style.scss';

export const useSolutions = () => {
    if (!isTouchscreen) {
        return;
    }

    const solutions = document.querySelector('.solutions');
    const cards = solutions.querySelectorAll('.solutions__card');

    const observer = getIntersectionObserver(49, (entry) => {
        entry.target.classList.add('active');
    }, (entry) => {
        entry.target.classList.remove('active');
    });

    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
};
