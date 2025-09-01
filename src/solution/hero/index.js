import { setTextBlur } from "../../common/textBlur";
import { useTransitionDelay, getIntersectionObserver } from "../../common/helpers";

import './style.scss';

export const useSolutionHero = () => {
    const block = document.querySelector('.solution-start');

    if (!block) {
        return;
    }

    const heading = block.querySelector('.solution-hero__content__heading');

    const texts = block.querySelector('.solution-tagline__info__text');
    const [textTitle, textContent] = texts.querySelectorAll('p');;

    const image = block.querySelector('.solution-start__image__sticky');
    const imageElement = image.querySelector('.solution-start__image__img');
    imageElement.classList.add('transition');

    const { animate: showTextTitle, revert: hideTextTitle, cleanup: cleanupTextTitle } = setTextBlur(textTitle);
    const { animate: showTextContent, revert: hideTextContent, cleanup: cleanupTextContent } = setTextBlur(textContent);

    const headingObserver = getIntersectionObserver(0, showHeading, hideHeading, { marginTop: 50 });
    headingObserver.observe(heading);

    const textsObserver = getIntersectionObserver(25, showTexts, hideTexts);
    textsObserver.observe(texts);

    const scrollTrigger = ScrollTrigger.create({
        trigger: block,
        start: "top top",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
            const progress = self.progress.toFixed(2);

            image.style.setProperty('--progress', progress);
        },
    });

    const observer = getIntersectionObserver(0, onIntersecting);

    function onIntersecting() {
        scrollTrigger.refresh();
    }

    const pageListenerCleanup = useTransitionDelay(initial);

    return () => {
        pageListenerCleanup();
        scrollTrigger.kill();
        cleanupTextTitle?.();
        cleanupTextContent?.();
        observer.disconnect();
        headingObserver.disconnect();
        textsObserver.disconnect();
    };

    function initial() {
        observer.observe(block);
        imageElement.classList.add('shown');
    }

    function showHeading() {
        heading.classList.remove('faded');
    }

    function hideHeading() {
        heading.classList.add('faded');
    }

    function hideTexts() {
        hideTextTitle();
        hideTextContent();
    }

    function showTexts() {
        showTextTitle();
        showTextContent();
    }
};
