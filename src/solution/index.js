import { useSolutionHero } from "./hero";
import { useSolutionCards } from "../common/solutions";
import { useCtaButtons } from "../common/cta";

import { getCleanup } from "../common/helpers";

export const useSolutionPageScripts = () => {
    getCleanup(
        useSolutionHero(),
        useSolutionCards(),
        useCtaButtons(),
    );
};
