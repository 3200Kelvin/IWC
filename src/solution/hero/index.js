import { setTextAppear } from "../../common/textAppear";
import { setTextBlur } from "../../common/textBlur";
import { useTransitionDelay, getIntersectionObserver } from "../../common/helpers";

import './style.scss';

export const useSolutionHero = () => {
    const block = document.querySelector('.solution-hero');

    if (!block) {
        return;
    }

    let isFisrtHalf = null;

    const heading = block.querySelector('.solution-hero__content__heading');
    const caption = heading.querySelector('p');
    const title = heading.querySelector('h1');

    const texts = block.querySelectorAll('.solution-hero__info__text p');
    const [textTitle, textContent] = texts;

    const image = block.querySelector('.solution-hero__image');
    const imageElement = image.querySelector('.solution-hero__image__img');
    imageElement.classList.add('transition');

    const { animate: showTitle, revert: hideTitle, cleanup: cleanupTitle } = setTextAppear(title);
    const { animate: showCaption, revert: hideCaption, cleanup: cleanupCaption } = setTextAppear(caption);
    const { animate: showTextTitle, revert: hideTextTitle, cleanup: cleanupTextTitle } = setTextBlur(textTitle);
    const { animate: showTextContent, revert: hideTextContent, cleanup: cleanupTextContent } = setTextBlur(textContent);

    const scrollTrigger = ScrollTrigger.create({
        trigger: block,
        start: "top top",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
            const progress = self.progress.toFixed(2);
            const newIsFisrtHalf = progress < 0.2;

            if (newIsFisrtHalf !== isFisrtHalf) {
                isFisrtHalf = newIsFisrtHalf;

                if (isFisrtHalf) {
                    showFirstHalf();
                } else {
                    showSecondHalf();
                }
            }

            gsap.to(image, {
                opacity: 1 - progress / 2,
                transform: `rotateZ(${-2 * progress}deg) scale(${1 - progress / 10})`,
            });
        },
    });

    const observer = getIntersectionObserver(0, onIntersecting);
    observer.observe(block);

    function onIntersecting() {
        scrollTrigger.refresh();
    }

    const pageListenerCleanup = useTransitionDelay(initial);

    return () => {
        pageListenerCleanup();
        scrollTrigger.kill();
        cleanupTitle?.();
        cleanupCaption?.();
        cleanupTextTitle?.();
        cleanupTextContent?.();
        observer.disconnect();
    };

    function initial() {
        showFirstHalf();
        imageElement.classList.add('shown');
    }

    function showFirstHalf() {
        showTitle();
        showCaption();
        hideTextTitle();
        hideTextContent();
    }

    function showSecondHalf() {
        hideTitle();
        hideCaption();
        showTextTitle();
        showTextContent();
    }
};
