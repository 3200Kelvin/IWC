import { useMenu } from "./menu";
import { useForm } from "./form";

import { setSmoothScroll } from "../common/smoothScroll/script";
import { setScrollBarWidthListener } from "../common/blockScroll/script";

export const useGlobalOnceScripts = () => {
    setScrollBarWidthListener();
    setSmoothScroll();
};

export const useGlobalScripts = () => {
    const menuCleanup = useMenu();
    useForm();

    return () => {
        menuCleanup();
    };
};
