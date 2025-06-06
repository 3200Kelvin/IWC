import { setTextBlur } from '../../common/textBlur';

import './style.scss';

const IMAGE_TRANSLATION = '100%';
const TRANSFORM = {
    TOP: `translateY(-${IMAGE_TRANSLATION})`,
    BOTTOM: `translateY(${IMAGE_TRANSLATION})`,
    ZERO: 'translateY(0)',
    SCALE_DOWN: 'scale(0.7)',
    SCALE_UP: 'scale(1.3)',
    SCALE_ZERO: 'scale(1)',
}
const IMAGE_BLUR = '10px';
const IMAGE_FILTER = {
    BLURRED: 'blur(10px)',
    ZERO: 'blur(0px)',
};
const DEFAULT_DURATION = 2;

export const useServicesAnimation = () => {
    const block = document.querySelector('.services');
    if (!block) {
        return;
    }

    const stepsContainer = block.querySelector('.services__steps');
    const steps = block.querySelectorAll('.services__step');
    const images = block.querySelectorAll('.services__image__img');
    const endBlock = block.querySelector('.services__end');
    const END = {
        block: block.querySelector('.services__end'),
        bg: endBlock.querySelector('.services__end__bg'),
        heading: endBlock.querySelector('.heading--services-end'),
        text: endBlock.querySelector('.services__end__text p'),
        taglibe: endBlock.querySelector('.services__end__tagline p'),
        image: endBlock.querySelector('.services__end__image'),
    };

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
        gsap.to(image, { opacity: 0, transform: `translateY(${IMAGE_TRANSLATION})`, filter: `blur(${IMAGE_BLUR})` });
    });

    gsap.timeline()
        .to([END.image, END.bg, END.heading, END.text, END.taglibe], { opacity: 0 });

    const animateEndTexts = gsap.timeline()
        .to(END.image, { opacity: 1, duration: DEFAULT_DURATION / 4 })
        .to(END.bg, { opacity: 1, duration: DEFAULT_DURATION / 4 })
        .to(END.heading, { opacity: 1, duration: DEFAULT_DURATION / 4 })
        .to(END.text, { opacity: 1, duration: DEFAULT_DURATION / 4 })
        .to(END.taglibe, { opacity: 1, duration: DEFAULT_DURATION / 4 });

    gsap.timeline({
        scrollTrigger: {
            trigger: stepsContainer,
            start: "top 50%",
            end: "bottom bottom+=400px",
            scrub: true
        }
    })
        .add('step0')
        .fromTo(
            ORGANS.BRAIN,
            { opacity: 0, transform: 'translateY(5%)', filter: IMAGE_FILTER.BLURRED },
            { opacity: 1, transform: TRANSFORM.ZERO, filter: IMAGE_FILTER.ZERO, duration: DEFAULT_DURATION / 2 },
            'step0'
        )
        .add('step1')
        .to(
            ORGANS.BRAIN,
            { transform: TRANSFORM.TOP, filter: IMAGE_FILTER.BLURRED, duration: DEFAULT_DURATION },
            'step1'
        )
        .to(
            ORGANS.NERVES,
            { opacity: 1 },
            'step1'
        )
        .fromTo(
            ORGANS.NERVES,
            { transform: TRANSFORM.BOTTOM, filter: IMAGE_FILTER.BLURRED },
            { transform: TRANSFORM.ZERO, filter: IMAGE_FILTER.ZERO, duration: DEFAULT_DURATION },
            'step1'
        )
        .add('step2')
        .to(
            ORGANS.NERVES,
            { transform: TRANSFORM.TOP, filter: IMAGE_FILTER.BLURRED, duration: DEFAULT_DURATION },
            'step2'
        )
        .to(
            ORGANS.LUNGS,
            { opacity: 1 },
            'step2'
        )
        .fromTo(
            ORGANS.LUNGS,
            { transform: TRANSFORM.BOTTOM, filter: IMAGE_FILTER.BLURRED },
            { transform: TRANSFORM.ZERO, filter: IMAGE_FILTER.ZERO, duration: DEFAULT_DURATION },
            'step2'
        )
        .add('step3')
        .to(
            ORGANS.LUNGS,
            { opacity: 0, transform: TRANSFORM.SCALE_DOWN, filter: IMAGE_FILTER.BLURRED, duration: DEFAULT_DURATION },
            'step3'
        )
        .fromTo(
            ORGANS.LYMPHS,
            { opacity: 0, transform: TRANSFORM.SCALE_UP, filter: IMAGE_FILTER.BLURRED },
            { opacity: 1, transform: TRANSFORM.SCALE_ZERO, filter: IMAGE_FILTER.ZERO, duration: DEFAULT_DURATION },
            'step3'
        )
        .add('step4')
        .to(
            ORGANS.LYMPHS,
            { opacity: 0, transform: TRANSFORM.SCALE_UP, filter: IMAGE_FILTER.BLURRED, duration: DEFAULT_DURATION },
            'step4'
        )
        .fromTo(
            ORGANS.HEART,
            { opacity: 0, transform: TRANSFORM.SCALE_DOWN, filter: IMAGE_FILTER.BLURRED },
            { opacity: 1, transform: TRANSFORM.SCALE_ZERO, filter: IMAGE_FILTER.ZERO, duration: DEFAULT_DURATION },
            'step4'
        )
        .to(
            ORGANS.HEART,
            { transform: 'translate(-18%, 15%) scale(0.2)', duration: DEFAULT_DURATION}
        )
        .add(animateEndTexts);

    // steps.forEach((step, index) => {
    //     ScrollTrigger.create({
    //         markers: true,
    //         trigger: step,
    //         start: "top 50%",
    //         end: "bottom 50%",
    //         scrub: true,
    //         onToggle: (self) => {
    //             const stepName = STEP_NAMES_ARR[index];
    //             const direction = self.direction === 1 ? DIRECTIONS.FORWARD : DIRECTIONS.BACKWARD;
    //             const action = self.isActive ? ACTIONS.SHOW : ACTIONS.HIDE;

    //             ANIMATIONS[stepName][direction][action]();
    //         },
    //     });
    // });

    function showImage(image, toTop = false, index = null) {
        let from;
        let duration = DEFAULT_DURATION;

        if (index === 0) {
            from = { opacity: 0, transform: 'translateY(5%)', filter: `blur(${IMAGE_BLUR})` };
            duration = DEFAULT_DURATION / 2;
        } else {
            from = { opacity: 0, transform: toTop ? `translateY(${IMAGE_TRANSLATION})` : `translateY(-${IMAGE_TRANSLATION})`, filter: `blur(${IMAGE_BLUR})` };
        }

        gsap.fromTo(image,
            from,
            { opacity: 1, transform: 'translateY(0)', filter: 'blur(0px)', duration }
        );
    }

    function hideImage(image, toTop = false) {
        gsap.to(image,
            { opacity: 0, transform: toTop ? `translateY(-${IMAGE_TRANSLATION})` : `translateY(${IMAGE_TRANSLATION})`, filter: `blur(${IMAGE_BLUR})`, duration: DEFAULT_DURATION }
        );
    }
}