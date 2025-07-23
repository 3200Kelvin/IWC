import { getIntersectionObserver } from '../../../common/helpers';

import './style.scss';

export const useTestimonialsDesktop = (block, entries) => {
    const FROM = -200;
    const TO = 400;
    const DISTANCE = TO - FROM;

    const OPACITY_START = 0.35;
    const OPACITY_END = 0.4;
    const OPACITY_DISTANCE = OPACITY_END - OPACITY_START;

    const delayStep = (1 / (entries.length + 2)).toFixed(2);

    const scrollTrigger = ScrollTrigger.create({
        trigger: block,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
            entries.forEach((entry, index) => {
                const delay = delayStep * index;
                const progress = self.progress - delay;

                const translation = FROM + DISTANCE * progress;

                const opacity = (OPACITY_END - progress) / OPACITY_DISTANCE;

                entry.style.setProperty('--translation', `${translation}px`);
                entry.style.setProperty('--opacity', opacity);
            });
        },
    });

    const observer = getIntersectionObserver(0, onIntersecting);
    observer.observe(block);

    function onIntersecting() {
        scrollTrigger.refresh();
    }

    return () => {
        scrollTrigger.kill();
        observer.disconnect();
    }
};