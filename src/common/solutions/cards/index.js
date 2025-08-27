import { isTouchscreen } from '../../helpers';
import { getIntersectionObserver } from '../../helpers';

import './style.scss';

export const useSolutionCardsStyle = () => {
    const solutions = document.querySelector('.solutions, .solutions__grid');
    if (!solutions) {
        return;
    }

    const cards = solutions.querySelectorAll('.solutions__card');

    if (!isTouchscreen) {
        return;
    }
    
    const observer = getIntersectionObserver(25, (entry) => {
        entry.target.classList.add('active');
    }, (entry) => {
        entry.target.classList.remove('active');
    });

    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
};
