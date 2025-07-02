import { getIsMobile } from '../../../common/helpers';

export const LINE_TOP_OFFSET = getIsMobile() ? 50 : 85;

export const useServicesLine = (block) => {
    const line = block.querySelector('.side-line');
    const glow = block.querySelector('.glowing-line__line--glow');

    const timeline = gsap.timeline({
        scrollTrigger: {
            trigger: line,
            start: `top ${LINE_TOP_OFFSET}%`,
            end: `bottom ${LINE_TOP_OFFSET}%`,
            scrub: 0.5
        },
    })
        .fromTo(glow, { scaleY: 0 }, { scaleY: 1, duration: 1, ease: 'none' });

    return () => timeline.kill();
};
