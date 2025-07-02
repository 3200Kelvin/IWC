import { isTouchscreen } from "../../common/helpers";
import { initGradient } from "./script";

export const useGradient = () => {
    if (!isTouchscreen) {
        try {
            initGradient();
            const imageGradient = document.querySelector('.page-bg__image--gradient');
            imageGradient.style.opacity = 0;
        } catch (e) {
            console.warn(e);
        }
    }
};
