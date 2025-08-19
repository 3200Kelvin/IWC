import { useButtonScroll } from '../../common/buttonScroll';

import './style.scss';

export const useExternalMedia = () => {
    const block = document.querySelector('.external-media');

    if (!block) {
        return;
    }

    const container = block.querySelector('.external-media__list');
    const entries = container.querySelectorAll('.external-media__entry');
    const [buttonLeft, buttonRight] = block.querySelectorAll('.arrow-button');

    return useButtonScroll(container, entries, buttonLeft, buttonRight);
};
