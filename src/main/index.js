import { useHeroAnimation } from "./hero";
import { useApproachAnimation } from "./approach";
import { useServicesAnimations } from "./services";

export const useMainPageScripts = () => {
    const cleanups = [
        useHeroAnimation(),
        useApproachAnimation(),
        useServicesAnimations()
    ]
    
    return () => cleanups.forEach((cleanup) => cleanup?.());
};
