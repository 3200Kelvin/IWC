export const setTextBlur = (element) => {
    const split = SplitText.create(element, {
        type: "lines, words",
    });

    gsap.to(split.words, {
        transform: 'scale(0.95)',
        opacity: 0,
        filter: 'blur(10px)',
    });

    return gsap.timeline()
        .pause()
        .to(split.words, {
            transform: 'scale(1)',
            opacity: 1,
            filter: 'blur(0px)',
            duration: 0.6,
            stagger: 0.02,
        });
}
