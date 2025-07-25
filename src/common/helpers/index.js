import { onPageTransitionEnd } from "../../global/transitions";

export function getNewValue(current, target, time, timeCoeff = 0.01, epsilon = 1) {
    const distance = target - current;
    const move = distance / 2 * time * timeCoeff;
    if (Math.abs(move) > Math.abs(distance)) {
        return target;
    }
    const newValue = current + move;
    if (Math.abs(newValue - target) < epsilon) {
        return target;
    }
    return newValue;
}

export function doAsync(callback, delay = 10) {
    return new Promise((res) => {
        callback();

        setTimeout(() => {
            res();
        }, delay);
    });
}

export const isTouchscreen = window.matchMedia("(pointer: coarse)").matches;

export const round = (num, digits = 3) => {
    const coeff = Math.pow(10, digits);
    return Math.round(num * coeff) / coeff;
}

export const tryCatch = (callback) => {
    try {
        return callback();
    } catch (error) {
        console.error(error);
    }
}

export const getIsDesktop = () => window.innerWidth > 991;

export const getIsMobile = () => window.innerWidth < 767;

export const getIsLeastMobile = () => window.innerWidth < 478;

export const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

export const isWeakDevice = isSafari || (window.navigator.deviceMemory || 0) < 4;

export function getSetVariable(obj, value) {
    return gsap.quickTo(obj, value, { duration: 0.8, ease: "power2.out" });
}

export const getRaf = () => {
    let raf = null;

    return function moveRaf(cb) {
        if (raf) {
            cancelAnimationFrame(raf);
            raf = null;
        }

        raf = requestAnimationFrame(cb);
    }
};

export const getSessionStorageValue = (key) => JSON.parse(sessionStorage.getItem(key));
export const setSessionStorageValue = (key, value) => sessionStorage.setItem(key, JSON.stringify(value));
export const removeSessionStorageValue = (key) => sessionStorage.removeItem(key);

export const getOnEnterPress = (callback) => {
    return (event) => {
        event.stopPropagation();
        if (event.key === 'Enter') {
            callback();
        }
    }
}

export const onTransitionEnd = (element, property, callback) => {
    const onTransitionEnd = (event) => {
        if (event.propertyName === property) {
            callback();
            element.removeEventListener('transitionend', onTransitionEnd);
        }
    }

    element.addEventListener('transitionend', onTransitionEnd);
};

export const isPrefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function getIntersectionObserver(margin = 15, onIntersecting = () => {}, onNotIntersecting = () => {}) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                onIntersecting(entry, observer);
            } else {
                onNotIntersecting(entry, observer);
            }
        });
    }, { rootMargin: `-${margin}% 0% -${margin}% 0%`, threshold: 0 });

    return observer;
}

export const getCleanup = (...cleanups) => {
    return () => cleanups.forEach((cleanup) => {
        cleanup?.();
    });
}

export const getPageNamespace = () => {
    const container = document.querySelector('[data-barba="container"]');

    return container?.dataset.barbaNamespace || null;
}

export const noop = () => {};

export const useTransitionDelay = (callback = () => {}) => {
    if (window.isTransitioning) {
        return onPageTransitionEnd(callback);
    } else {
        callback();
        return noop;
    }
}

export const useElementAnimation = (elements, getElementAnimation) => {
    const observers = {};

    const cleanups = [...elements].map((element) => {
        const { animate, cleanup } = getElementAnimation(element);

        element.animate = animate;

        return cleanup;
    });

    const cleanupPageListener = useTransitionDelay(addObservers);

    function addObservers() {
        elements.forEach((element) => {
            const offset = element.dataset.animationOffset || 15;

            const observer = getObserver(offset);

            observer.observe(element);
        });
    }

    function getObserver(offset) {
        if (!observers[offset]) {
            observers[offset] = getIntersectionObserver(offset, onIntersection);
        }

        return observers[offset];
    }

    function onIntersection(entry, observer) {
        entry.target.animate();
        observer.unobserve(entry.target);
    }

    return getCleanup(
        ...cleanups,
        cleanupPageListener,
        () => {
            Object.values(observers).forEach((observer) => observer.disconnect());
        }
    );
};
