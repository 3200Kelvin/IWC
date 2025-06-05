import { usePreloader } from "./preloader";
import { useMenu } from "./menu";
import { useForm } from "./form";
import { useBgObserver } from "./bgObserver";

import { setSmoothScroll } from "../common/smoothScroll/script";
import { setScrollBarWidthListener } from "../common/blockScroll/script";

export const useGlobalOnceScripts = () => {
    usePreloader();
    setScrollBarWidthListener();
    setSmoothScroll();
};

export const useGlobalScripts = () => {
    const cleanups = [
        useMenu(),
        useForm(),
        useBgObserver()
    ];

    return () => cleanups.forEach((cleanup) => cleanup?.());
};
