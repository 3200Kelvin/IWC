import { useSolutionCardsStyle } from "../common/solutions/cards";
import { useCtaButtons } from "../common/cta";

import { getCleanup } from "../common/helpers";

import './style.scss';

export const useSolutionsPageScripts = () => {
    return getCleanup(
        useSolutionCardsStyle(),
        useCtaButtons(),
    );
};

export { useSolutionsPageScripts as usePageScripts };
