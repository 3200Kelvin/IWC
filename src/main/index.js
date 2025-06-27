import { useHeroAnimation } from "./hero";
import { useApproachAnimation } from "./approach";
import { useServicesAnimations } from "./services";
import { useSolutions } from "./strategyAndSolutions/solutions";
import { useStrategy } from "./strategyAndSolutions/strategy";

export const useMainPageScripts = () => {
    const cleanups = [
        useHeroAnimation(),
        useApproachAnimation(),
        useServicesAnimations(),
        useSolutions(),
        useStrategy()
    ]
    
    return () => cleanups.forEach((cleanup) => cleanup?.());
};
