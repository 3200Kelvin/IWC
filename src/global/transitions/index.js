import barba from '@barba/core';

import { scrollTo, scrollToAnchor } from '../../common/smoothScroll/script';

const TRANSITION_END_EVENT = 'page-transition-end';

export const onPageTransitionEnd = (callback = () => {}) => {
    document.addEventListener(TRANSITION_END_EVENT, callback, { once: true });

    return () => document.removeEventListener(TRANSITION_END_EVENT, callback);
}

export function sendTransitionEndEvent() {
    document.dispatchEvent(new CustomEvent(TRANSITION_END_EVENT));
    window.isTransitioning = false;
}

export const usePageTransitions = (runScripts = () => {}) => {
    const overlay = document.getElementById('page-transition');

    const onLeave = () => {
        if (overlay) {
            window.isTransitioning = true;
            return gsap.timeline().to(overlay, { opacity: 0, display: 'block' }).to(overlay, { opacity: 1, duration: 0.8 });
        }
        return Promise.resolve();
    };

    const onEnter = () => {
        if (overlay) {
            return gsap.timeline()
                .to(overlay, { opacity: 0, duration: 0.8 })
                .to(overlay, { display: 'none' })
                .add(() => {
                    sendTransitionEndEvent();
                });
        }
        return Promise.resolve();
    };

    function stopSctoll() {
        if (lenis) {
            lenis.stop();
        }
    }

    function startSctoll() {
        if (lenis) {
            lenis.start();
        }
    }

    function resetScroll() {
        if (lenis) {
            lenis.resize();
        }
    }

    try {
        barba.init({
            transitions: [
                {
                    name: 'transition',
                    leave() {
                        return window.leavePageAnimation ? window.leavePageAnimation() : onLeave();
                    },
                    enter() {
                        return window.enterPageAnimation ? window.enterPageAnimation() : onEnter();
                    }
                },
            ]
        });
        
        barba.hooks.beforeLeave((data) => {
            stopSctoll();
        });
        
        barba.hooks.beforeEnter((data) => {
            data.current.container.remove();
            resetScroll();
            scrollTo(0, true);
        });
        
        barba.hooks.enter((data) => {
            startSctoll();
            runScripts();
            resetWebflow(data);
            scrollToAnchor(true);
        });
        
        barba.hooks.after((data) => {
            window.leavePageAnimation = null;
            window.enterPageAnimation = null;
            scrollToAnchor();
        });
    } catch (error) {
        console.warn('Barba init error', error);
    }
};

function resetWebflow(data) {
    let parser = new DOMParser();
    let dom = parser.parseFromString(data.next.html, "text/html");
    let webflowPageId = dom.documentElement.getAttribute("data-wf-page");
    document.documentElement.setAttribute("data-wf-page", webflowPageId);
    window.Webflow && window.Webflow.destroy();
    window.Webflow && window.Webflow.ready();
    window.Webflow && window.Webflow.require("ix2")?.init?.();
    restartAutoplayedVideos();
}

function restartAutoplayedVideos() {
    const videos = document.querySelectorAll('video[autoplay]');
    videos.forEach(video => {
        if (video.paused) {
            video.play().catch(console.warn);
        }
    });
}
