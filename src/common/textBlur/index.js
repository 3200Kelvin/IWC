export const setTextBlur = (element, isPaused = true) => {
    const split = SplitText.create(element, {
        type: "lines, words",
    });

    split.lines.forEach((line) => {
        if (!line.innerHTML) {
            line.style.setProperty('height', '1em');
        }
    });

    gsap.to(split.words, {
        transform: 'scale(0.95)',
        opacity: 0,
        filter: 'blur(10px)',
    });
    gsap.to(element, { pointerEvents: 'none' });

    const timeline = gsap.timeline()
        .to(element, { pointerEvents: 'auto' })
        .to(split.words, {
            transform: 'scale(1)',
            opacity: 1,
            filter: 'blur(0px)',
            duration: 1,
            stagger: 0.005,
        });

    if (isPaused) {
        timeline.pause();
    }

    return timeline;
}
