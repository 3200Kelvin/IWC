import { usePreloader } from "./preloader";
import { useMenu } from "./menu";
import { useForm } from "./form";
import { useBgObserver } from "./bgObserver";
import { useFooter } from "./footer";
import { useBgParallax } from "./bgParallax";

import { setSmoothScroll } from "../common/smoothScroll/script";
import { setScrollBarWidthListener } from "../common/blockScroll/script";
import { getCleanup } from "../common/helpers";

import './style.scss';
import './underline/style.scss';

export const useGlobalOnceScripts = () => {
    setSmoothScroll();
    usePreloader();
    setScrollBarWidthListener();
    useBgParallax();
};

export const useGlobalScripts = () => {
    return getCleanup(
        useMenu(),
        useForm(),
        useBgObserver(),
        useFooter()
    );
};
