import './style.scss';

export const ANIMATION_MODE = {
    NO_ANIMATIONS: 'no-animations',
    LESS_ANIMATIONS: 'less-animations',
};

const isWeakDevice = () => {
    const { deviceMemory = null, hardwareConcurrency = 0 } = navigator;
    return hardwareConcurrency < 4 || (deviceMemory && deviceMemory < 4);
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
    if (!('CSS' in window && CSS.supports('transform', 'translate3d(0,0,0)'))) {
        return true;
    }
    return false;
};

const useNoAnimations = () => {
    // if (sessionStorage.getItem('animation-mode') === ANIMATION_MODE.NO_ANIMATIONS) {
    //     return true;
    // }
    if (isOldBrowser()) {
        return true;
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return true;
    }
    return false;
};

const useLessAnimations = () => {
    // if (sessionStorage.getItem('animation-mode') === ANIMATION_MODE.LESS_ANIMATIONS) {
    //     return true;
    // }
    return isWeakDevice();
};

const measureFrameRate = (duration = 1000) => {
    return new Promise(resolve => {
        let frames = 0;
        const start = performance.now();

        function frame() {
            frames++;
            if (performance.now() - start < duration) {
                requestAnimationFrame(frame);
            } else {
                const fps = frames / (duration / 1000);
                resolve(fps);
            }
        }

        requestAnimationFrame(frame);
    });
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

    // if (!reducedAnimations && !sessionStorage.getItem('animation-mode')) {
    //     measureFrameRate().then((fps) => {
    //         if (fps < 10) {
    //             sessionStorage.setItem('animation-mode', ANIMATION_MODE.NO_ANIMATIONS);
    //             window.location.reload();
    //             return;
    //         }

    //         if (fps < 20) {
    //             sessionStorage.setItem('animation-mode', ANIMATION_MODE.LESS_ANIMATIONS);
    //             window.location.reload();
    //             return;
    //         }

    //         sessionStorage.setItem('animation-mode', 'full');
    //     });
    // }

    return { noAnimations, lessAnimations, reducedAnimations };
}