import { useHeroAnimation } from "./hero";
import { useApproachAnimation } from "./approach";
import { useServicesAnimation } from "./services";

export const useMainPageScripts = () => {
    useHeroAnimation();
    useApproachAnimation();
    useServicesAnimation();
};
