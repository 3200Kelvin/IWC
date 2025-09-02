import { isTouchscreen, getScrollTriggerRefresh } from '../../../common/helpers';
import { IMAGE_TRANSLATION, TRANSFORM, IMAGE_FILTER, DEFAULT_DURATION } from "./common";
import { useServicesMobileStory } from './mobile';

import './style.scss';

export const useServicesStory = (block) => {
    const isMobile = isTouchscreen;

    const endBlock = block.querySelector('.services__end');
    const END = {
        block: endBlock,
        bg: endBlock.querySelector('.services__end__bg'),
        logo: endBlock.querySelector('.services__end__logo__image'),
        heading: getSplitText(endBlock.querySelector('.heading--services-end')),
        text: getSplitText(endBlock.querySelector('.services__end__text p')),
        tagline: getSplitText(endBlock.querySelector('.services__end__tagline p')),
        image: endBlock.querySelector('.services__end__image'),
    };

    gsap.set([END.image, END.bg], { opacity: 0 });
    gsap.set(END.logo, { opacity: 0, transform: 'scale(0.75)' });

    if (isMobile) {
        return useServicesMobileStory(block, END);
    }

    const stepsContainer = block.querySelector('.services__steps');
    const images = block.querySelectorAll('.services__image__img');

    const ORGANS = {
        BRAIN: images[0],
        NERVES: images[1],
        LUNGS: images[2],
        LYMPHS: images[3],
        HEART: images[4],
    };

    images.forEach(image => {
        gsap.to(image, { opacity: 0, transform: `translateY(${IMAGE_TRANSLATION})`, filter: IMAGE_FILTER.BLURRED });
    });

    const endBlockTrigger = ScrollTrigger.create({
        trigger: endBlock,
        start: 'top top',
	    onToggle: (self) => {
            const { isActive, direction } = self;
            const appear = !!isActive && direction === 1;
            const disappear = !isActive && direction === -1;

            if (appear) {
                showEndBlock();
            } else if (disappear) {
                hideEndBlock();
            }
        },
    });

    function showEndBlock() {
        const textAnimationDuration = 2 * DEFAULT_DURATION / END.heading.length;

        return gsap.timeline()
            .set(END.block, { opacity: 1 })
            .add('bg-change')
            .to(END.image, { opacity: 1, duration: DEFAULT_DURATION / 4 }, 'bg-change')
            .to(END.bg, { opacity: 1, duration: DEFAULT_DURATION / 4 }, 'bg-change')
            .to(END.heading, { opacity: 1, filter: IMAGE_FILTER.ZERO, duration: textAnimationDuration, stagger: 0.1 / END.heading.length }, 'texts')
            .to(END.text, { opacity: 1, filter: IMAGE_FILTER.ZERO, duration: textAnimationDuration, stagger: 0.1 / END.text.length }, 'texts')
            .to(END.logo, { opacity: 1, transform: 'scale(1)', duration: DEFAULT_DURATION }, 'texts')
            .to(END.tagline, { opacity: 1, filter: IMAGE_FILTER.ZERO, duration: DEFAULT_DURATION / END.tagline.length, stagger: 0.1 / END.tagline.length });
    };

    function hideEndBlock() {
        return gsap.timeline()
            .to(END.block, { opacity: 0, duration: DEFAULT_DURATION / 4 })
            .set([END.image, END.bg], { opacity: 0 })
            .set([...END.heading, ...END.text, ...END.tagline], { opacity: 0, filter: IMAGE_FILTER.BLURRED })
            .set(END.logo, { opacity: 0, transform: 'scale(0.75)' });
    }

    const timeline = gsap.timeline({
        scrollTrigger: {
            // markers: true,
            trigger: stepsContainer,
            start: isMobile ? 'top 60%' : "top 20%",
            end: "bottom center",
            scrub: 1.5,
        },
        defaults: { ease: "linear" }
    })
        .set(Object.values(ORGANS), { willChange: 'opacity, transform, filter' })
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
            { transform: 'translate(-12%, 0%) scale(0.25)', duration: DEFAULT_DURATION / 2}
        )
        .set(Object.values(ORGANS), {
            willChange: '',
        });

    const triggerRefreshCleanup = getScrollTriggerRefresh(block, timeline.scrollTrigger);

    const imagesLoadedPromises = [...images].map((image) => {
        if (image.complete) {
            return Promise.resolve();
        }
        return new Promise((resolve) => {
            image.addEventListener('load', resolve);
        });
    });

    Promise.all(imagesLoadedPromises).then(() => {
        requestAnimationFrame(() => {
            timeline.seek(1);
            timeline.seek(0);
        });
    });

    return () => {
        timeline.kill();
        endBlockTrigger.kill();
        triggerRefreshCleanup?.();
    };

    function getSplitText(element) {
        const split = SplitText.create(element, {
            type: 'lines',
            linesClass: 'services__end__text-line',
        });

        gsap.set(split.lines, { opacity: 0 });
        if (!isMobile) {
            gsap.set(split.lines, { filter: IMAGE_FILTER.BLURRED });
        }

        return split.lines;
    }
}