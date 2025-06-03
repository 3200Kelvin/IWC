import { usePageTransitions } from "../Kultiveret/src/transitions/script";
import { useGlobalScripts, useGlobalOnceScripts } from "./src/global";

if (gsap) {
    gsap.defaults({
        duration: 0,
        ease: 'power4.out'
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

    cleanup = () => {
        globalScriptsCleanup?.();
    }
}

function init() {
    if (!isInitialized) {
        once();
        isInitialized = true;
    }

    each();
}

