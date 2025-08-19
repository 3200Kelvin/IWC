import { getCleanup } from '../../common/helpers';
import { usePastEventsRunner } from './runner';

import './style.scss';

export const usePastEvents = () => {
    const block = document.querySelector('.past-events');

    if (!block) {
        return;
    }

    return getCleanup(
        usePastEventsRunner(block),
    );
};