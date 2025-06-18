import { useHeroAnimation } from "./hero";
import { useApproachAnimation } from "./approach";
import { useServicesAnimations } from "./services";

import './strategyAndSolutions/style.scss';

export const useMainPageScripts = () => {
    const cleanups = [
        useHeroAnimation(),
        useApproachAnimation(),
        useServicesAnimations()
    ]
    
    return () => cleanups.forEach((cleanup) => cleanup?.());
};
