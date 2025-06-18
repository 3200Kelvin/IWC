export const setTextAppear = (element, isPaused = true) => {
    const split = SplitText.create(element, {
        type: 'lines',
        autoSplit: true,
        mask: 'lines',
    });

    split.lines.forEach((line) => {
        if (!line.innerHTML) {
            line.style.setProperty('height', '1em');
        }
    });

    gsap.to(split.lines, {
        transform: 'translateY(120%) rotateZ(1deg)',
    });
    gsap.to(element, { pointerEvents: 'none' });

    const timeline = gsap.timeline()
        .to(element, { pointerEvents: 'auto' })
        .to(split.words, {
            willChange: 'transform',
        })
        .to(split.lines, {
            transform: 'translateY(0%) rotateZ(0deg)',
            duration: 1,
            stagger: 0.15,
        })
        .to(split.lines, {
            willChange: 'none',
        });

    if (isPaused) {
        timeline.pause();
    }

    return timeline;
}
