import { useTabs } from "../../common/tabs";

import './style.scss';

export const useMediaTabs = () => {
    const block = document.querySelector('.media--intelligence');

    if (!block) {
        return;
    }

    return useTabs(block);
};
