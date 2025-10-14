import { getIntersectionObserver } from "../../../common/helpers";
import { isNoAnimations } from "../../../common/performance";

import './style.scss';

export const useTeamCards = (block) => {
    if (isNoAnimations()) {
        return;
    }

    const cards = block.querySelectorAll('.team__card');

    const observer = getIntersectionObserver(10, showCard);

    addClass(cards, 'blured');

    setTimeout(() => {
        addClass(cards, 'transition');
        cards.forEach((card) => observer.observe(card));
    });

    return () => observer.disconnect();

    function showCard(entry) {
        entry.target.classList.remove('blured');
        observer.unobserve(entry.target);
    }

    function addClass(elements, className) {
        elements.forEach((element) => element.classList.add(className));
    }
};
