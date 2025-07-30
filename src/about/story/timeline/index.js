import { getIntersectionObserver, getIsDesktop } from '../../../common/helpers';

import './style.scss';

export const useTimeline = (story) => {
    const timeline = story.querySelector('.story__timeline');
    if (!timeline) {
        return;
    }

    const observer = getIntersectionObserver(50, onIntersecting);

    if (!getIsDesktop()) {
        const entries = timeline.querySelectorAll('.timeline-entry');
        entries.forEach((entry) => {
            observer.observe(entry);
        });
    }

    const timelout = setTimeout(() => {
        timeline.classList.add('transition');

        observer.observe(timeline);
    }, 10);

    return () => {
        clearTimeout(timelout);
        observer.disconnect();
    }

    function onIntersecting(entry, observer) {
        entry.target.classList.add('animated');
        observer.unobserve(entry.target);
    }
};