import { usePageTransitions } from "../Kultiveret/src/transitions/script";
import { useGlobalScripts, useGlobalOnceScripts } from "./src/global";
import { useMainPageScripts } from "./src/main";

if (gsap) {
    gsap.defaults({
        duration: 0,
        ease: 'power2.inOut'
    });
}

let isInitialized = false;
let cleanup;
init();

function once() {
    useGlobalOnceScripts();
    
    usePageTransitions(each);
}

function each() {
    if (cleanup) {
        cleanup();
    }

    const globalScriptsCleanup = useGlobalScripts();
    const mainScriptsCleanup = useMainPageScripts();

    cleanup = () => {
        globalScriptsCleanup?.();
        mainScriptsCleanup?.();
    }
}

function init() {
    if (!isInitialized) {
        once();
        isInitialized = true;
    }

    each();
}

