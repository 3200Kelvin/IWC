import { IMAGE_TRANSLATION, TRANSFORM, IMAGE_FILTER, DEFAULT_DURATION } from "./common";

export const useServicesMobileStory = (block, END, toggledElements) => {
    const steps = block.querySelectorAll('.services__step, .services__end');
    const images = block.querySelectorAll('.services__image__img');

    const STEP_NAMES = {
        BRAIN: 'BRAIN',
        NERVES: 'NERVES',
        LUNGS: 'LUNGS',
        LYMPHS: 'LYMPHS',
        HEART: 'HEART',
        END: 'END',
    };

    const STEP_NAMES_ARR = [STEP_NAMES.BRAIN, STEP_NAMES.NERVES, STEP_NAMES.LUNGS, STEP_NAMES.LYMPHS, STEP_NAMES.HEART, STEP_NAMES.END];

    const DIRECTIONS = {
        FORWARD: 'FORWARD',
        BACKWARD: 'BACKWARD',
    };

    const ACTIONS = {
        SHOW: 'SHOW',
        HIDE: 'HIDE',
    };

    const ORGANS = {
        [STEP_NAMES.BRAIN]: images[0],
        [STEP_NAMES.NERVES]: images[1],
        [STEP_NAMES.LUNGS]: images[2],
        [STEP_NAMES.LYMPHS]: images[3],
        [STEP_NAMES.HEART]: images[4],
    };

    const ANIMATIONS = {
        [STEP_NAMES.BRAIN]: {
            [DIRECTIONS.FORWARD]: {
                [ACTIONS.SHOW]: () => {
                    gsap.fromTo(ORGANS.BRAIN,
                        { opacity: 0, transform: 'translateY(25%)', filter: IMAGE_FILTER.BLURRED },
                        { opacity: 1, transform: TRANSFORM.ZERO, filter: IMAGE_FILTER.ZERO, duration: DEFAULT_DURATION / 2 }
                    );
                },
                [ACTIONS.HIDE]: () => {
                    gsap.to(ORGANS.BRAIN,
                        { opacity: 0, transform: TRANSFORM.TOP, filter: IMAGE_FILTER.BLURRED, duration: DEFAULT_DURATION }
                    );
                }
            },
            [DIRECTIONS.BACKWARD]: {
                [ACTIONS.SHOW]: () => {
                    gsap.fromTo(ORGANS.BRAIN,
                        { opacity: 0, transform: TRANSFORM.TOP, filter: IMAGE_FILTER.BLURRED, duration: DEFAULT_DURATION },
                        { opacity: 1, transform: TRANSFORM.ZERO, filter: IMAGE_FILTER.ZERO, duration: DEFAULT_DURATION }
                    );
                },
                [ACTIONS.HIDE]: () => {
                    gsap.to(ORGANS.BRAIN,
                        { opacity: 0, transform: 'translateY(5%)', filter: IMAGE_FILTER.BLURRED, duration: DEFAULT_DURATION / 2 }
                    );
                }
            },
        },
        [STEP_NAMES.NERVES]: {
            [DIRECTIONS.FORWARD]: {
                [ACTIONS.SHOW]: () => {
                    gsap.fromTo(ORGANS.NERVES,
                        { opacity: 0, transform: TRANSFORM.BOTTOM, filter: IMAGE_FILTER.BLURRED },
                        { opacity: 1, transform: TRANSFORM.ZERO, filter: IMAGE_FILTER.ZERO, duration: DEFAULT_DURATION }
                    );
                },
                [ACTIONS.HIDE]: () => {
                    gsap.to(ORGANS.NERVES,
                        { opacity: 0, transform: TRANSFORM.TOP, filter: IMAGE_FILTER.BLURRED, duration: DEFAULT_DURATION }
                    );
                }
            },
            [DIRECTIONS.BACKWARD]: {
                [ACTIONS.SHOW]: () => {
                    gsap.fromTo(ORGANS.NERVES,
                        { opacity: 0, transform: TRANSFORM.TOP, filter: IMAGE_FILTER.BLURRED, duration: DEFAULT_DURATION },
                        { opacity: 1, transform: TRANSFORM.ZERO, filter: IMAGE_FILTER.ZERO, duration: DEFAULT_DURATION }
                    );
                },
                [ACTIONS.HIDE]: () => {
                    gsap.to(ORGANS.NERVES,
                        { opacity: 0, transform: TRANSFORM.BOTTOM, filter: IMAGE_FILTER.BLURRED, duration: DEFAULT_DURATION }
                    );
                }
            },
        },
        [STEP_NAMES.LUNGS]: {
            [DIRECTIONS.FORWARD]: {
                [ACTIONS.SHOW]: () => {
                    gsap.fromTo(ORGANS.LUNGS,
                        { opacity: 0, transform: TRANSFORM.BOTTOM, filter: IMAGE_FILTER.BLURRED },
                        { opacity: 1, transform: TRANSFORM.ZERO, filter: IMAGE_FILTER.ZERO, duration: DEFAULT_DURATION }
                    );
                },
                [ACTIONS.HIDE]: () => {
                    gsap.to(ORGANS.LUNGS,
                        { opacity: 0, transform: TRANSFORM.SCALE_DOWN, filter: IMAGE_FILTER.BLURRED, duration: DEFAULT_DURATION }
                    );
                }
            },
            [DIRECTIONS.BACKWARD]: {
                [ACTIONS.SHOW]: () => {
                    gsap.fromTo(ORGANS.LUNGS,
                        { opacity: 0, transform: TRANSFORM.SCALE_DOWN, filter: IMAGE_FILTER.BLURRED, duration: DEFAULT_DURATION },
                        { opacity: 1, transform: TRANSFORM.SCALE_ZERO, filter: IMAGE_FILTER.ZERO, duration: DEFAULT_DURATION }
                    );
                },
                [ACTIONS.HIDE]: () => {
                    gsap.to(ORGANS.LUNGS,
                        { opacity: 0, transform: TRANSFORM.BOTTOM, filter: IMAGE_FILTER.BLURRED, duration: DEFAULT_DURATION }
                    );
                }
            },
        },
        [STEP_NAMES.LYMPHS]: {
            [DIRECTIONS.FORWARD]: {
                [ACTIONS.SHOW]: () => {
                    gsap.fromTo(ORGANS.LYMPHS,
                        { opacity: 0, transform: TRANSFORM.SCALE_UP, filter: IMAGE_FILTER.BLURRED },
                        { opacity: 1, transform: TRANSFORM.SCALE_ZERO, filter: IMAGE_FILTER.ZERO, duration: DEFAULT_DURATION }
                    );
                },
                [ACTIONS.HIDE]: () => {
                    gsap.to(ORGANS.LYMPHS,
                        { opacity: 0, transform: TRANSFORM.SCALE_UP, filter: IMAGE_FILTER.BLURRED, duration: DEFAULT_DURATION }
                    );
                }
            },
            [DIRECTIONS.BACKWARD]: {
                [ACTIONS.SHOW]: () => {
                    gsap.fromTo(ORGANS.LYMPHS,
                        { opacity: 0, transform: TRANSFORM.SCALE_UP, filter: IMAGE_FILTER.BLURRED, duration: DEFAULT_DURATION },
                        { opacity: 1, transform: TRANSFORM.SCALE_ZERO, filter: IMAGE_FILTER.ZERO, duration: DEFAULT_DURATION }
                    );
                },
                [ACTIONS.HIDE]: () => {
                    gsap.to(ORGANS.LYMPHS,
                        { opacity: 0, transform: TRANSFORM.SCALE_UP, filter: IMAGE_FILTER.BLURRED, duration: DEFAULT_DURATION }
                    );
                }
            },
        },
        [STEP_NAMES.HEART]: {
            [DIRECTIONS.FORWARD]: {
                [ACTIONS.SHOW]: () => {
                    gsap.fromTo(ORGANS.HEART,
                        { opacity: 0, transform: TRANSFORM.SCALE_DOWN, filter: IMAGE_FILTER.BLURRED },
                        { opacity: 1, transform: TRANSFORM.SCALE_ZERO, filter: IMAGE_FILTER.ZERO, duration: DEFAULT_DURATION }
                    );
                },
                [ACTIONS.HIDE]: () => {
                    gsap.to(ORGANS.HEART,
                        { transform: 'translate(-12%, 0%) scale(0.25)', duration: DEFAULT_DURATION }
                    );
                }
            },
            [DIRECTIONS.BACKWARD]: {
                [ACTIONS.SHOW]: () => {
                    gsap.to(ORGANS.HEART,
                        { transform: TRANSFORM.SCALE_ZERO, duration: DEFAULT_DURATION }
                    );
                },
                [ACTIONS.HIDE]: () => {
                    gsap.to(ORGANS.HEART,
                        { opacity: 0, transform: TRANSFORM.SCALE_DOWN, filter: IMAGE_FILTER.BLURRED, duration: DEFAULT_DURATION }
                    );
                }
            },
        }
        ,
        [STEP_NAMES.END]: {
            [DIRECTIONS.FORWARD]: {
                [ACTIONS.SHOW]: () => {
                    gsap.timeline()
                        .set(END.block, { opacity: 1 })
                        .to(END.image, { opacity: 1, duration: DEFAULT_DURATION / 2 })
                        .add('bg-change')
                        .to(END.bg, { opacity: 1, duration: DEFAULT_DURATION / 4 }, 'bg-change')
                        .to(toggledElements, { color: 'var(--dark-blue)', duration: DEFAULT_DURATION / 4 }, 'bg-change')
                        .add('elements')
                        .to(END.logo, { opacity: 1, transform: 'scale(1)', duration: DEFAULT_DURATION / 2 }, 'elements')
                        .to(END.heading, { opacity: 1, duration: DEFAULT_DURATION / 4 }, 'elements')
                        .to(END.text, { opacity: 1, duration: DEFAULT_DURATION / 4 })
                        .to(END.tagline, { opacity: 1, duration: DEFAULT_DURATION / 4 });
                },
            },
            [DIRECTIONS.BACKWARD]: {
                [ACTIONS.HIDE]: () => {
                    gsap.timeline()
                        .to(END.block, { opacity: 0, duration: DEFAULT_DURATION / 2 })
                        .set([END.image, END.bg, END.heading, END.text, END.tagline], { opacity: 0 })
                        .set(END.logo, { opacity: 0, transform: 'scale(0.75)' });
                },
            },
        }
    }

    images.forEach(image => {
        gsap.set(image, { opacity: 0, transform: `translateY(${IMAGE_TRANSLATION})`, filter: IMAGE_FILTER.BLURRED });
    });

    let currentAnimation;

    const cleanups = [...steps].map((step, index) => {
        const isEnd = index === steps.length - 1;

        const scrollTrigger = ScrollTrigger.create({
            markers: true,
            trigger: step,
            start: isEnd ? "top top" : "top 50%",
            end: "bottom 50%",
            onToggle: (self) => {
                const stepName = STEP_NAMES_ARR[index];
                const direction = self.direction === 1 ? DIRECTIONS.FORWARD : DIRECTIONS.BACKWARD;
                const action = self.isActive ? ACTIONS.SHOW : ACTIONS.HIDE;

                const newAnimation = ANIMATIONS[stepName][direction][action]?.();

                currentAnimation = newAnimation;
            },
        });

        return () => scrollTrigger.kill();
    });

    return () => {
        cleanups.forEach(cleanup => cleanup());
        currentAnimation?.kill();
    }
}