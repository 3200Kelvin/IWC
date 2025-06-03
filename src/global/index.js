import { useMenu } from "./menu";

import { setScrollBarWidthListener } from "../common/blockScroll/script";

export const useGlobalOnceScripts = () => {
    setScrollBarWidthListener();
};

export const useGlobalScripts = () => {
    const menuCleanup = useMenu();

    return () => {
        menuCleanup();
    };
};
