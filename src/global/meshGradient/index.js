import { isTouchscreen } from "../../common/helpers";
import { initGradient } from "./script";
import { isReducedAnimation } from "../../common/performance";

export const useGradient = () => {
    if (isTouchscreen || isReducedAnimation()) {
        return;
    }

    try {
        initGradient();
        const imageGradient = document.querySelector('.page-bg__image--gradient');
        imageGradient.style.opacity = 0;
    } catch (e) {
        console.warn(e);
    }
};
