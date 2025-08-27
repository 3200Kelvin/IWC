import { useSolutionsCardsShift } from "./shift";
import { useSolutionCardsStyle } from "./cards";

import { getCleanup } from "../helpers";

export const useSolutionCards = () => {
    return getCleanup(
        useSolutionsCardsShift(),
        useSolutionCardsStyle(),
    );
};
