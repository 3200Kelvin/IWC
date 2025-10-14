import { useHeroLoadAnimation } from "./onLoad";
import { useHeroTipAnimation } from "./tip";
import { getCleanup } from "../../common/helpers";
import { isNoAnimations } from "../../common/performance";

export const useHeroAnimation = () => {
    if (isNoAnimations()) {
        return null;
    }

    return getCleanup(
        useHeroLoadAnimation(),
        useHeroTipAnimation()
    );
};