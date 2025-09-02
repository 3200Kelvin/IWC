import { getScrollTriggerRefresh } from '../../../common/helpers';

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

    const triggerRefreshCleanup = getScrollTriggerRefresh(block, scrollTrigger);

    return () => {
        scrollTrigger.kill();
        triggerRefreshCleanup?.();
    };
};
