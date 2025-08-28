// import Lenis from 'lenis';

export function scrollTo(target, isInstant = false) {
    if (window.lenis) {
        window.lenis.scrollTo(target, { immediate: isInstant, force: isInstant });
        return;
    }

    if (isNaN(target)) {
        document.querySelector(target).scrollIntoView({ behavior: isInstant ? 'instant' : 'smooth' });
    } else {
        window.scrollTo(0, target);
    }
}

export function scrollToAnchor(isInstant = false) {
    const params = new URL(window.location).searchParams;
    const anchor = params.get('anchor');
    if (anchor) {
        scrollTo(`#${anchor}`, isInstant);
    }
}

export const getScrollPosition = () => {
    if (window.lenis) {
        return window.lenis.scroll;
    }

    return window.pageYOffset || document.documentElement.scrollTop;
}

export const setSmoothScroll = () => {
    if (!window.Lenis) {
        return;
    }

    const content = document.querySelector('main');
    if (!content) {
        return;
    }

    const lenis = new Lenis({
        duration: 1.2,
        wheelMultiplier: 1,
        touchMultiplier: 1,
        autoRaf: true,
        // syncTouch: true,
        prevent: (node) => !!node.closest('.form__dropdown'),
    });

    document.addEventListener('DOMContentLoaded', scrollToAnchor);

    // weird shit to get lenis scroll to work properly
    lenis.resizeDebounce = null;

    lenis.on('scroll', onScroll);

    // if (window.ScrollTrigger) {
    //     // Synchronize Lenis scrolling with GSAP's ScrollTrigger plugin
    //     lenis.on('scroll', ScrollTrigger.update);

    //     // Add Lenis's requestAnimationFrame (raf) method to GSAP's ticker
    //     // This ensures Lenis's smooth scroll animation updates on each GSAP tick
    //     gsap.ticker.add((time) => {
    //     lenis.raf(time * 1000); // Convert time from seconds to milliseconds
    //     });

    //     // Disable lag smoothing in GSAP to prevent any delay in scroll animations
    //     gsap.ticker.lagSmoothing(0);
    // }

    function onScroll(event) {
        const { scrollHeight } = event.dimensions;
        if (scrollHeight !== document.body.scrollHeight) {
            resize();
        }
    }

    function onResize(entry) {
        if (entry.target === document.documentElement) {
            try {
                Object.defineProperty(window, 'innerHeight', {
                    get: function() {
                      return entry.contentRect.height;
                    }
                });
            } catch(error) {
                console.warn(error);
            }
        }
        
        resize();
    }

    function resize() {
        clearTimeout(lenis.resizeDebounce);
        lenis.resizeDebounce = setTimeout(() => {
            lenis.resize();
        }, 100);
    }

    const docHeightObserver = new ResizeObserver((entries) => {
        onResize(entries[0]);
    });
    docHeightObserver.observe(document.documentElement);
    docHeightObserver.observe(document.body);
    docHeightObserver.observe(content);

    document.documentElement.style.setProperty('height', 'auto');
    setTimeout(() => {
        document.documentElement.style.setProperty('height', '100%');
    }, 100);
    // end of the weird shit

    window.lenis = lenis;

    return lenis;
};
