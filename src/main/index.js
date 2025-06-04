import { useApproachAnimation } from "./approach";
import { useServicesAnimation } from "./services";

export const useMainPageScripts = () => {
    useApproachAnimation();
    useServicesAnimation();
};
