import { useSolutionHero } from "./hero";
import { useSolutionsCards } from "../common/solutions";
import { useCtaButtons } from "../common/cta";

import { getCleanup } from "../common/helpers";

export const useSolutionPageScripts = () => {
    getCleanup(
        useSolutionHero(),
        useSolutionsCards(),
        useCtaButtons(),
    );
};
