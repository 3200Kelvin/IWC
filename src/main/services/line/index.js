export const useServicesLine = (block) => {
    const line = block.querySelector('.side-line');
    const glow = block.querySelector('.glowing-line__line--glow');

    const timeline = gsap.timeline({
        scrollTrigger: {
            trigger: line,
            start: "top center",
            end: "bottom center",
            scrub: 0.5
        },
    })
        .fromTo(glow, { scaleY: 0 }, { scaleY: 1, duration: 1, ease: 'none' });

    return () => timeline.kill();
};
