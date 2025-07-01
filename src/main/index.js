import { useHeroAnimation } from "./hero";
import { useApproachAnimation } from "./approach";
import { useServicesAnimations } from "./services";
import { useSolutions } from "./strategyAndSolutions/solutions";
import { useStrategy } from "./strategyAndSolutions/strategy";
import { getCleanup } from "../common/helpers";

export const useMainPageScripts = () => {
    return getCleanup(
        useHeroAnimation(),
        useApproachAnimation(),
        useServicesAnimations(),
        useSolutions(),
        useStrategy()
    );
};
