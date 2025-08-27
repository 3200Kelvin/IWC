import { useSolutionCards } from "../../common/solutions";
import { useStrategy } from "./strategy";

import { getCleanup } from "../../common/helpers";

export const useStrategyAndSolutions = () => {
    return getCleanup(
        useSolutionCards(),
        useStrategy(),
    );
}