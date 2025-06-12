import { getIntersectionObserver } from "../../../common/helpers";
import { setTextBlur } from "../../../common/textBlur";

export const useServicesTexts = (block) => {
    const texts = block.querySelectorAll('.services__step__content p');

    const intersectionObserver = getIntersectionObserver(15, onIntersecting);

    const timelines = [...texts].map((text) => {
        const timeline = setTextBlur(text);

        text.animate = () => timeline.play().add(() => timeline.kill());
        intersectionObserver.observe(text);

        return timeline;
    });

    return () => {
        intersectionObserver.disconnect();
        timelines.forEach((timeline) => timeline.kill());
    };
    
    function onIntersecting(entry, observer) {
        observer.unobserve(entry.target);

        entry.target.animate();
    }
}