import { useHeroLoadAnimation } from "./onLoad";
import { useHeroTipAnimation } from "./tip";
import { getCleanup } from "../../common/helpers";

export const useHeroAnimation = () => {
    return getCleanup(
        useHeroLoadAnimation(),
        useHeroTipAnimation()
    );
};