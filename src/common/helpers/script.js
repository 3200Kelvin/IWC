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
