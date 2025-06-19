import './style.scss';

const IMAGE_TRANSLATION = '70%';
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

export const useServicesStory = (block) => {
    const stepsContainer = block.querySelector('.services__steps');
    const images = block.querySelectorAll('.services__image__img');
    const endBlock = block.querySelector('.services__end');
    const END = {
        block: block.querySelector('.services__end'),
        bg: endBlock.querySelector('.services__end__bg'),
        logo: endBlock.querySelector('.services__end__logo__image'),
        heading: endBlock.querySelector('.heading--services-end'),
        text: endBlock.querySelector('.services__end__text p'),
        taglibe: endBlock.querySelector('.services__end__tagline p'),
        image: endBlock.querySelector('.services__end__image'),
    };
    const toggledElements = document.querySelectorAll('.bg-toggled');
    console.log(toggledElements);

    const ORGANS = {
        BRAIN: images[0],
        NERVES: images[1],
        LUNGS: images[2],
        LYMPHS: images[3],
        HEART: images[4],
    };

    images.forEach(image => {
        gsap.to(image, { opacity: 0, transform: `translateY(${IMAGE_TRANSLATION})`, filter: `blur(${IMAGE_BLUR})` });
    });

    gsap.timeline()
        .to([END.image, END.bg, END.heading, END.text, END.taglibe], { opacity: 0 })
        .to(END.logo, { opacity: 0, transform: 'scale(0.75)' });

    const animateEndTexts = gsap.timeline()
        .to({}, { duration: DEFAULT_DURATION / 4 })
        .to(END.image, { opacity: 1, duration: DEFAULT_DURATION / 4 })
        .add('bg-change')
        .to(END.bg, { opacity: 1, duration: DEFAULT_DURATION / 4 }, 'bg-change')
        .to(toggledElements, { color: 'var(--dark-blue)', duration: DEFAULT_DURATION / 4 }, 'bg-change')
        .to(END.heading, { opacity: 1, duration: DEFAULT_DURATION / 4 })
        .to(END.text, { opacity: 1, duration: DEFAULT_DURATION / 4 })
        .to(END.taglibe, { opacity: 1, duration: DEFAULT_DURATION / 4 })
        .to(END.logo, { opacity: 1, transform: 'scale(1)', duration: DEFAULT_DURATION / 2 })
        .to({}, { duration: DEFAULT_DURATION / 2 });

    const timeline = gsap.timeline({
        scrollTrigger: {
            // markers: true,
            trigger: stepsContainer,
            start: "top 20%",
            end: "bottom center",
            scrub: 1
        },
        defaults: { ease: "linear" }
    })
        .to(Object.values(ORGANS), {
            willChange: 'opacity, transform, filter',
        })
        .add('step0')
        .fromTo(
            ORGANS.BRAIN,
            { opacity: 0, transform: 'translateY(50%) scale(0.6)', filter: IMAGE_FILTER.BLURRED },
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
            { opacity: 1, duration: DEFAULT_DURATION / 4 },
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
            ORGANS.BRAIN,
            { opacity: 0, duration: DEFAULT_DURATION / 4 },
            'step2'
        )
        .to(
            ORGANS.NERVES,
            { transform: TRANSFORM.TOP, filter: IMAGE_FILTER.BLURRED, duration: DEFAULT_DURATION },
            'step2'
        )
        .to(
            ORGANS.LUNGS,
            { opacity: 1, duration: DEFAULT_DURATION / 4 },
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
            ORGANS.NERVES,
            { opacity: 0, duration: DEFAULT_DURATION / 4 },
            'step3'
        )
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
            { transform: 'translate(-12%, 0%) scale(0.25)', duration: DEFAULT_DURATION}
        )
        .to(Object.values(ORGANS), {
            willChange: '',
        })
        .add(animateEndTexts);

    return () => timeline.kill();
}