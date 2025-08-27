import { useSolutionCardsStyle } from "../common/solutions/cards";

import { getCleanup } from "../common/helpers";

import './style.scss';

export const useSolutionsPageScripts = () => {
    return getCleanup(
        useSolutionCardsStyle(),
    );
};
