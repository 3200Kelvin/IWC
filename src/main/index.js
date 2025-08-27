import { useHeroAnimation } from "./hero";
import { useApproachAnimation } from "./approach";
import { useServicesAnimations } from "./services";
import { useStrategyAndSolutions } from "./strategyAndSolutions";
import { getCleanup } from "../common/helpers";

export const useMainPageScripts = () => {
    return getCleanup(
        useHeroAnimation(),
        useApproachAnimation(),
        useServicesAnimations(),
        useStrategyAndSolutions(),
    );
};
