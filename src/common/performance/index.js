export const ANIMATION_MODE = {
    NO_ANIMATIONS: 'no-animations',
    LESS_ANIMATIONS: 'less-animations',
};

const isWeakDevice = () => {
    const { deviceMemory = 0, hardwareConcurrency = 0 } = navigator;
    return hardwareConcurrency < 4 || deviceMemory < 4;
}

const isOldBrowser = () => {
    if (!('IntersectionObserver' in window)) {
        return true;
    }
    if (!('MutationObserver' in window)) {
        return true;
    }
    if (!('ResizeObserver' in window)) {
        return true;
    }
    if (!('requestAnimationFrame' in window)) {
        return true;
    }
    return false;
};

const useNoAnimations = () => {
    return true; // always no animations for testing
    if (isOldBrowser()) {
        return true;
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return true;
    }
    return false;
};

const useLessAnimations = () => {
    return isWeakDevice();
};

export const isLessAnimations = () => {
    return window.animationMode === ANIMATION_MODE.LESS_ANIMATIONS;
};

export const isNoAnimations = () => {
    return window.animationMode === ANIMATION_MODE.NO_ANIMATIONS;
};

export const isReducedAnimation = () => {
    return isLessAnimations() || isNoAnimations();
}

export const setDocumentAnimationMode = () => {
    const noAnimations = useNoAnimations();
    const lessAnimations = useLessAnimations();
    const reducedAnimations = noAnimations || lessAnimations;

    if (noAnimations) {
        window.animationMode = ANIMATION_MODE.NO_ANIMATIONS;
        document.body.setAttribute('data-animation-mode', ANIMATION_MODE.NO_ANIMATIONS);
    }
    if (lessAnimations) {
        window.animationMode = ANIMATION_MODE.LESS_ANIMATIONS;
        document.body.setAttribute('data-animation-mode', ANIMATION_MODE.LESS_ANIMATIONS);
    }

    return { noAnimations, lessAnimations, reducedAnimations };
}