import { useButtonScroll } from '../../common/buttonScroll';

import './style.scss';

export const useEvents = () => {
    const block = document.querySelector('.events');

    if (!block) {
        return;
    }

    const container = block.querySelector('.events__list');
    const entries = container.querySelectorAll('.events__entry');
    const [buttonLeft, buttonRight] = block.querySelectorAll('.arrow-button');

    return useButtonScroll(container, entries, buttonLeft, buttonRight);
};
