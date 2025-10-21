import { getIntersectionObserver } from "../../../common/helpers";
import { isNoAnimations } from "../../../common/performance";

import './style.scss';

export const useTeamCards = (block) => {
    if (isNoAnimations()) {
        return;
    }

    const cards = block.querySelectorAll('.team__card');
    cards.forEach((card, index) => {
        card.classList.add('blurred');
        card.style.setProperty('--delay', `${(index % 4) * 0.1}s`);
    });

    const observer = getIntersectionObserver(10, showCard);

    setTimeout(() => {
        cards.forEach((card) => observer.observe(card));
    });

    return () => observer.disconnect();

    function showCard(entry) {
        observer.unobserve(entry.target);

        entry.target.classList.add('transition');
        
        setTimeout(() => {
            entry.target.classList.remove('blurred');
        }, 50);
    }
};
