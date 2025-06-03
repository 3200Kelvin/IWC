import {
    doAsync,
    tryCatch,
    getIsDesktop,
    isTouchscreen,
    isWeakDevice,
    getSetVariable,
    getSessionStorageValue,
    setSessionStorageValue,
    removeSessionStorageValue,
    getOnEnterPress
} from "./script";
import { onTransitionEnd } from "./onTransitionEnd";
import { isPrefersReducedMotion } from "./reducedMotion";

export {
    doAsync,
    onTransitionEnd,
    tryCatch,
    isPrefersReducedMotion,
    getIsDesktop,
    isTouchscreen,
    isWeakDevice,
    getSetVariable,
    getSessionStorageValue,
    setSessionStorageValue,
    removeSessionStorageValue,
    getOnEnterPress,
};
