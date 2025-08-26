import { isTouchscreen } from '../../common/helpers';
import { getIntersectionObserver } from '../../common/helpers';

import './style.scss';

export const useSolutions = () => {
    const solutions = document.querySelector('.solutions');
    if (!solutions) {
        return;
    }

    const cards = solutions.querySelectorAll('.solutions__card');

    if (isTouchscreen) {
        return useMobileSolutions(cards);
    }
};

function useMobileSolutions(cards) {
    const observer = getIntersectionObserver(25, (entry) => {
        entry.target.classList.add('active');
    }, (entry) => {
        entry.target.classList.remove('active');
    });

    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
}
