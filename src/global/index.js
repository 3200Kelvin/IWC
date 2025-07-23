import { usePreloader } from "./preloader";
import { useMenu } from "./menu";
import { useForm } from "./form";
import { useBgObserver } from "./bgObserver";
import { useFooter } from "./footer";
import { useGradient } from "./meshGradient";
import { useVideos } from "./videos";
import { useTextBlur, useTextAppear } from "./textAnimations";

import { setSmoothScroll } from "../common/smoothScroll/script";
import { setScrollBarWidthListener } from "../common/blockScroll";
import { getCleanup } from "../common/helpers";

import './style.scss';
import './underline/style.scss';

export const useGlobalOnceScripts = () => {
    setSmoothScroll();
    usePreloader();
    setScrollBarWidthListener();
    useMenu(),
    useGradient();
};

export const useGlobalScripts = () => {
    return getCleanup(
        useTextBlur(),
        useTextAppear(),
        useForm(),
        useBgObserver(),
        useFooter(),
        useVideos(),
    );
};
