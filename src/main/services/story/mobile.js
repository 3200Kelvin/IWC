import { IMAGE_TRANSLATION, TRANSFORM, IMAGE_FILTER, DEFAULT_DURATION } from "./common";

export const useServicesMobileStory = (block, END) => {
    const steps = block.querySelectorAll('.services__step');
    const images = block.querySelectorAll('.services__image__img');

    const STEP_NAMES = {
        BRAIN: 'BRAIN',
        NERVES: 'NERVES',
        LUNGS: 'LUNGS',
        LYMPHS: 'LYMPHS',
        HEART: 'HEART',
    };

    const STEP_NAMES_ARR = [STEP_NAMES.BRAIN, STEP_NAMES.NERVES, STEP_NAMES.LUNGS, STEP_NAMES.LYMPHS, STEP_NAMES.HEART];

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
                        { opacity: 0, transform: 'translateY(5%)', filter: IMAGE_FILTER.BLURRED },
                        { opacity: 1, transform: TRANSFORM.ZERO, filter: IMAGE_FILTER.ZERO, duration: DEFAULT_DURATION / 2 }
                    );
                },
                [ACTIONS.HIDE]: () => {
                    gsap.to(ORGANS.BRAIN,
                        { transform: TRANSFORM.TOP, filter: IMAGE_FILTER.BLURRED, duration: DEFAULT_DURATION }
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
                    gsap.to(ORGANS.NERVES, { opacity: 1 });
                    gsap.fromTo(ORGANS.NERVES,
                        { transform: TRANSFORM.BOTTOM, filter: IMAGE_FILTER.BLURRED },
                        { transform: TRANSFORM.ZERO, filter: IMAGE_FILTER.ZERO, duration: DEFAULT_DURATION }
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
                        { opacity: 0, transform: TRANSFORM.SCALE_DOWN, filter: IMAGE_FILTER.BLURRED, duration: DEFAULT_DURATION }
                    );
                }
            },
            [DIRECTIONS.BACKWARD]: {
                [ACTIONS.SHOW]: () => {
                    gsap.fromTo(ORGANS.HEART,
                        { opacity: 0, transform: TRANSFORM.SCALE_DOWN, filter: IMAGE_FILTER.BLURRED, duration: DEFAULT_DURATION },
                        { opacity: 1, transform: TRANSFORM.SCALE_ZERO, filter: IMAGE_FILTER.ZERO, duration: DEFAULT_DURATION }
                    );
                },
                [ACTIONS.HIDE]: () => {
                    gsap.to(ORGANS.HEART,
                        { opacity: 0, transform: TRANSFORM.SCALE_DOWN, filter: IMAGE_FILTER.BLURRED, duration: DEFAULT_DURATION }
                    );
                }
            },
        }
    }

    images.forEach(image => {
        gsap.set(image, { opacity: 0, transform: `translateY(${IMAGE_TRANSLATION})`, filter: IMAGE_FILTER.BLURRED });
    });

    steps.forEach((step, index) => {
        ScrollTrigger.create({
            markers: true,
            trigger: step,
            start: "top 50%",
            end: "bottom 50%",
            onToggle: (self) => {
                const stepName = STEP_NAMES_ARR[index];
                const direction = self.direction === 1 ? DIRECTIONS.FORWARD : DIRECTIONS.BACKWARD;
                const action = self.isActive ? ACTIONS.SHOW : ACTIONS.HIDE;

                ANIMATIONS[stepName][direction][action]();
            },
        });
    });
}