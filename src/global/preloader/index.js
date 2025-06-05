import { isLoaded, setIsLoaded } from "../../initial";
import { blockScroll, unblockScroll } from "../../common/blockScroll/script";
import { scrollTo } from "../../common/smoothScroll/script";

import './style.scss';

const READY_EVENT_NAME = 'website-loaded';

export const postReadyEvent = () => document.dispatchEvent(new CustomEvent(READY_EVENT_NAME));

export const PRELOADER_REMOVED_EVENT_NAME = 'preloader-removed';

const postPreloaderRemovedEvent = () => document.dispatchEvent(new CustomEvent(PRELOADER_REMOVED_EVENT_NAME));

export const usePreloader = () => {
    if (isLoaded()) {
        return
    };

    const preloader = document.querySelector('.preloader');
    if (!preloader) {
        return;
    }

    scrollTo(0, true);
    blockScroll();
    const letter = preloader.querySelector('.preloader__title__h');

    document.addEventListener(READY_EVENT_NAME, animatePreloader);

    function animatePreloader() {
        gsap.timeline()
            .delay(0.5)
            .to(letter, { transform: 'translateY(-100%)', duration: 1 })
            .add(() => {
                scrollTo(0, true);
            })
            .to(preloader, { opacity: 0, duration: 0.6 })
            .delay(0.8)
            .add(() => {
                preloader.remove();
                postPreloaderRemovedEvent();
                unblockScroll();
                setIsLoaded();
            });
    }
};
