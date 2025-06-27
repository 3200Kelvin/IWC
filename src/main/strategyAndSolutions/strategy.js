import { setTextBlur } from "../../common/textBlur";
import { setTextAppear } from "../../common/textAppear";
import { getIntersectionObserver } from "../../common/helpers";

export const useStrategy = () => {
    const block = document.querySelector('.strategy');
    if (!block) {
        return;
    }

    const title = block.querySelector('.heading--strategy');
    const text = block.querySelector('.strategy__content p');

    const { animate: animateText, cleanup: cleanupText } = setTextBlur(text);
    text.animate = animateText;

    const { animate: animateTitle, cleanup: cleanupTitle } = setTextAppear(title);
    title.animate = animateTitle;

    const observer = getIntersectionObserver(15, onIntersect);
    observer.observe(text);
    observer.observe(title);

    return () => {
        observer.disconnect();
        cleanupText?.();
        cleanupTitle?.();
    }
    
    function onIntersect(entry, observer) {
        entry.target.animate();
        observer.unobserve(entry.target);
    }
};
