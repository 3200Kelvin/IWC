import { usePreloader } from "./preloader";
import { useMenu } from "./menu";
import { useForm } from "./form";
import { useBgObserver } from "./bgObserver";
import { useFooter } from "./footer";

import { setSmoothScroll } from "../common/smoothScroll/script";
import { setScrollBarWidthListener } from "../common/blockScroll/script";

import './style.scss';
import './underline/style.scss';

export const useGlobalOnceScripts = () => {
    setSmoothScroll();
    usePreloader();
    setScrollBarWidthListener();
};

export const useGlobalScripts = () => {
    const cleanups = [
        useMenu(),
        useForm(),
        useBgObserver(),
        useFooter()
    ];

    return () => cleanups.forEach((cleanup) => cleanup?.());
};
