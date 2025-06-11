import { useHeroLoadAnimation } from "./onLoad";
import { useHeroTipAnimation } from "./tip";

export const useHeroAnimation = () => {
    const cleanups = [
        useHeroLoadAnimation(),
        useHeroTipAnimation()
    ];
    
    return () => cleanups.forEach((cleanup) => cleanup?.());
};