import { usePreloader } from "./preloader";
import { useMenu } from "./menu";
import { useForm } from "./form";
import { useBgObserver } from "./bgObserver";
import { useFooter } from "./footer";
// import { useGradient } from "./meshGradient";
import { useVideos } from "./videos";
import { useTextBlur, useTextAppear } from "./textAnimations";
import { useSafariForceRepaint } from "./forceRepaint";
import { initYoutubeVideos } from "./youtube";
import { useMembersAreaLinks } from "./membersLinks";

import { setScrollBarWidthListener } from "../common/blockScroll";
import { useAnalytics } from "./analytics";
import { getCleanup } from "../common/helpers";
import { setDocumentAnimationMode } from "../common/performance";
import { isTouchscreen } from "../common/helpers";

import './style.scss';
import './underline/style.scss';

export const useGlobalOnceScripts = () => {
    const { noAnimations, lessAnimations, reducedAnimations } = setDocumentAnimationMode();

    if (!reducedAnimations) {
        import("../common/smoothScroll/script").then(({ setSmoothScroll }) => {
            setSmoothScroll();
        });
    }

    usePreloader();
    setScrollBarWidthListener();
    useMenu();

    if (!reducedAnimations && !isTouchscreen) {
        import("./meshGradient").then(({ useGradient }) => {
            useGradient();
        });
    }

    initYoutubeVideos();
    useAnalytics();
};

export const useGlobalScripts = () => {
    return getCleanup(
        useTextBlur(),
        useTextAppear(),
        useForm(),
        useBgObserver(),
        useFooter(),
        useVideos(),
        useSafariForceRepaint(),
        useMembersAreaLinks(),
    );
};
