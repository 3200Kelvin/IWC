import { getIntersectionObserver, isSafari } from "../../../common/helpers";
import { setTextBlur } from "../../../common/textBlur";
import { setTextAppear } from "../../../common/textAppear";

import { LINE_TOP_OFFSET } from "../line";

import './style.scss';

export const useServicesTexts = (block) => {
    const headings = block.querySelectorAll('.services__step__heading');
    const texts = block.querySelectorAll('.services__step__content p');

    const safariCleanup = isSafari ? useSafariFix() : null;

    const intersectionObserver = getIntersectionObserver(20, onIntersecting);
    const DASH_MARGIN = 100 - LINE_TOP_OFFSET;
    const dashIntersectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appeared');
            } else {
                entry.target.classList.remove('appeared');
            }
        });
    }, { threshold: 0, rootMargin: `${DASH_MARGIN}% 0% -${DASH_MARGIN}% 0%` });

    const textCleanups = [...texts].map((text) => {
        const { animate, cleanup } = setTextBlur(text);
        text.animate = animate;
        intersectionObserver.observe(text);

        return cleanup;
    });

    const headingCleanups = [...headings].map((heading) => {
        const text = heading.querySelector('.heading--services');
        const index = heading.querySelector('.services__step__index');

        const { animate, cleanup } = setTextAppear(text);
        text.animate = animate;
        intersectionObserver.observe(text);

        dashIntersectionObserver.observe(index);

        return cleanup;
    });

    return () => {
        intersectionObserver.disconnect();
        dashIntersectionObserver.disconnect();
        [...textCleanups, ...headingCleanups].forEach((cleanup) => cleanup?.());
        safariCleanup?.();
    };
    
    function onIntersecting(entry, observer) {
        observer.unobserve(entry.target);

        entry.target.animate();
    }
}

function useSafariFix() {
    const headings = document.querySelectorAll('.heading--services');

    const intersectionObserver = getIntersectionObserver(0, onIntersecting, onNotIntersecting);
    headings.forEach((heading) => intersectionObserver.observe(heading));

    return () => intersectionObserver.disconnect();

    function onIntersecting(entry) {
        entry.target.classList.add('force-repaint');
    }

    function onNotIntersecting(entry) {
        entry.target.classList.remove('force-repaint');
    }
}