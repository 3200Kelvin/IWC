import { getIntersectionObserver } from "../../../common/helpers";
import { setTextBlur } from "../../../common/textBlur";
import { setTextAppear } from "../../../common/textAppear";

import { LINE_TOP_OFFSET } from "../line";

import './style.scss';

export const useServicesTexts = (block) => {
    const headings = block.querySelectorAll('.services__step__heading');
    const texts = block.querySelectorAll('.services__step__content p');

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

    const textTimelines = [...texts].map((text) => {
        const timeline = setTextBlur(text);

        text.animate = () => timeline.play().add(() => timeline.kill());
        intersectionObserver.observe(text);

        return timeline;
    });

    const titleTimelines = [...headings].map((heading) => {
        const text = heading.querySelector('.heading--services');
        const index = heading.querySelector('.services__step__index');

        const timeline = setTextAppear(text);

        text.animate = () => timeline.play().add(() => timeline.kill());
        intersectionObserver.observe(text);

        dashIntersectionObserver.observe(index);

        return timeline;
    });

    return () => {
        intersectionObserver.disconnect();
        dashIntersectionObserver.disconnect();
        textTimelines.forEach((timeline) => timeline.kill());
        titleTimelines.forEach((timeline) => timeline.kill());
    };
    
    function onIntersecting(entry, observer) {
        observer.unobserve(entry.target);

        entry.target.animate();
    }
}