import { getIntersectionObserver } from "../../../common/helpers";
import { setTextBlur } from "../../../common/textBlur";
import { setTextAppear } from "../../../common/textAppear";

export const useServicesTexts = (block) => {
    const titles = block.querySelectorAll('.heading--services');
    const texts = block.querySelectorAll('.services__step__content p');

    const intersectionObserver = getIntersectionObserver(15, onIntersecting);

    const textTimelines = [...texts].map((text) => {
        const timeline = setTextBlur(text);

        text.animate = () => timeline.play().add(() => timeline.kill());
        intersectionObserver.observe(text);

        return timeline;
    });

    const titleTimelines = [...titles].map((text) => {
        const timeline = setTextAppear(text);

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