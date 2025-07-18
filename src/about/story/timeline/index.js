import { getIntersectionObserver } from '../../../common/helpers';

import './style.scss';

export const useTimeline = (story) => {
    const timeline = story.querySelector('.story__timeline');
    if (!timeline) {
        return;
    }

    const entries = timeline.querySelectorAll('.timeline-entry');
    entries.forEach((entry, index) => {
        entry.style.setProperty('--index', index);
    });

    setTimeout(() => {
        timeline.classList.add('transition');

        const observer = getIntersectionObserver(50, onIntersecting);
        observer.observe(timeline);
    }, 10);

    function onIntersecting(entry, observer) {
        entry.target.classList.add('animated');
        observer.disconnect();
    }
};