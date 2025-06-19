import { getIntersectionObserver } from "../../../common/helpers";
import { setTextBlur } from "../../../common/textBlur";
import { setTextAppear } from "../../../common/textAppear";

import './style.scss';

export const useServicesTexts = (block) => {
    const headings = block.querySelectorAll('.services__step__heading');
    const texts = block.querySelectorAll('.services__step__content p');

    const intersectionObserver = getIntersectionObserver(20, onIntersecting);

    const textTimelines = [...texts].map((text) => {
        const timeline = setTextBlur(text);

        text.animate = () => timeline.play().add(() => timeline.kill());
        intersectionObserver.observe(text);

        return timeline;
    });

    const titleTimelines = [...headings].map((heading) => {
        const text = heading.querySelector('.heading--services');

        const timeline = gsap.timeline().add(() => heading.classList.add('appeared'));
        setTextAppear(text, { timeline });

        text.animate = () => timeline.play().add(() => timeline.kill());
        intersectionObserver.observe(text);

        return timeline;
    });

    return () => {
        intersectionObserver.disconnect();
        textTimelines.forEach((timeline) => timeline.kill());
        titleTimelines.forEach((timeline) => timeline.kill());
    };
    
    function onIntersecting(entry, observer) {
        observer.unobserve(entry.target);

        entry.target.animate();
    }
}