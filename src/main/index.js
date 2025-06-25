import { useHeroAnimation } from "./hero";
import { useApproachAnimation } from "./approach";
import { useServicesAnimations } from "./services";
import { useSolutions } from "./strategyAndSolutions/solutions";

export const useMainPageScripts = () => {
    const cleanups = [
        useHeroAnimation(),
        useApproachAnimation(),
        useServicesAnimations(),
        useSolutions()
    ]
    
    return () => cleanups.forEach((cleanup) => cleanup?.());
};
