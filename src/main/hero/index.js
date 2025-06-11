import { useHeroLoadAnimation } from "./onLoad/inedx";
import { useHeroTipAnimation } from "./tip";

export const useHeroAnimation = () => {
    const cleanups = [
        useHeroLoadAnimation(),
        useHeroTipAnimation()
    ];
    
    return () => cleanups.forEach((cleanup) => cleanup?.());
};