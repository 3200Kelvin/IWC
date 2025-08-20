import { getIntersectionObserver } from '../../../common/helpers';

import './style.scss';

export const usePastEventsParallax = (block) => {
    const scrollTrigger = ScrollTrigger.create({
        trigger: block,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
            const progress = self.progress.toFixed(2);

            block.style.setProperty('--progress', progress);
        },
    });

    const observer = getIntersectionObserver(0, onIntersecting);
    observer.observe(block);

    return () => {
        scrollTrigger.kill();
        observer.disconnect();
    };

    function onIntersecting() {
        scrollTrigger.refresh();
    }
};
