import { getCleanup } from '../../common/helpers';
import { usePastEventsRunner } from './runner';
import { usePastEventsSlides } from './slides';
import { usePastEventsParallax } from './parallax';

import './style.scss';

export const usePastEvents = () => {
    const block = document.querySelector('.past-events');

    if (!block) {
        return;
    }

    return getCleanup(
        usePastEventsRunner(block),
        usePastEventsSlides(block),
        usePastEventsParallax(block),
    );
};