import barba from '@barba/core';

import { scrollTo, scrollToAnchor, getScrollPosition } from '../../common/smoothScroll/script';

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
    let scrollPosition = 0;
    let hash = null;

    try {
        barba.init({
            transitions: [
                {
                    name: 'transition',
                    leave(data) {
                        if (isBack(data)) {
                            return;
                        }
                        return window.leavePageAnimation ? window.leavePageAnimation() : onLeave();
                    },
                    enter(data) {
                        if (isBack(data)) {
                            return;
                        }
                        return window.enterPageAnimation ? window.enterPageAnimation() : onEnter();
                    }
                },
            ]
        });
        
        barba.hooks.beforeLeave((data) => {
            hash = data.trigger.hash || null;
            scrollPosition = getScrollPosition();
            stopSctoll();
        });
        
        barba.hooks.beforeEnter((data) => {
            data.current.container.remove();
            resetScroll();
            if (!isBack(data)) {
                scrollTo(0, true);
            }
        });
        
        barba.hooks.enter((data) => {
            reloadMemberstack();
            startSctoll();
            runScripts();
            resetWebflow(data);
            if (isBack(data)) {
                scrollTo(scrollPosition, true);
            } else {
                scrollToAnchor(hash, true);
            }
        });
        
        barba.hooks.after((data) => {
            window.leavePageAnimation = null;
            window.enterPageAnimation = null;
            if (!isBack(data)) {
                scrollToAnchor(hash);
            }
            
            hash = null;
        });

        scrollToAnchor(location.hash || null, true);
    } catch (error) {
        console.warn('Barba init error', error);
    }

    function onLeave() {
        if (overlay) {
            window.isTransitioning = true;
            return gsap.timeline().to(overlay, { opacity: 0, display: 'block' }).to(overlay, { opacity: 1, duration: 0.8 });
        }
        return Promise.resolve();
    };

    function onEnter() {
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

    function isBack(data) {
        return data.trigger === 'back';
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

function reloadMemberstack() {
    const old = document.querySelector('script[src*="memberstack"]');

    if (old) {
        const newScript = document.createElement('script');

        for (const attr of old.attributes) {
            newScript.setAttribute(attr.name, attr.value);
        }
        
        old.remove();
        document.head.appendChild(newScript);
    }
}
