import { usePageTransitions } from "./src/global/transitions";
import { useGlobalScripts, useGlobalOnceScripts } from "./src/global";
import { postReadyEvent } from "./src/global/preloader";
import { getPageNamespace } from "./src/common/helpers";

const MODULE_MAP = {
    home: './src/main',
    about: './src/about',
    media: './src/media',
    solutions: './src/solutions',
    solution: './src/solution',
    contact: './src/contact',
    signup: './src/memberstack/signup',
    'members-area': './src/memberstack/account',
    intelligence: './src/intelligence',
    article: './src/article',
};

if (gsap) {
    gsap.defaults({
        duration: 0,
        ease: 'power2.inOut'
    });
}

let isInitialized = false;
let cleanup;
window.isTransitioning = false;
init();

async function loadAndRunModule(namespace) {
    const modulePath = MODULE_MAP[namespace];

    if (!modulePath) {
        return null;
    }

    const cleanup = await import(modulePath).then(({ usePageScripts }) => {
        return usePageScripts?.();
    });

    return cleanup;
}

function once() {
    useGlobalOnceScripts();
    
    usePageTransitions(each);
}

async function runPageSpecificScript() {
    const pageNamespace = getPageNamespace();
    
    const cleanup = await loadAndRunModule(pageNamespace);

    return cleanup;
}

async function each() {
    try {
        if (cleanup) {
            cleanup();
            cleanup = null;
        }

        const globalScriptsCleanup = useGlobalScripts();
        const pageScriptCleanup = await runPageSpecificScript();

        cleanup = () => {
            globalScriptsCleanup?.();
            pageScriptCleanup?.();
        }
    } catch (e) {
        console.error(e);
    }
}

function init() {
    if (!isInitialized) {
        once();
        isInitialized = true;
    }

    document.fonts.ready.then(() => {
        each();
        postReadyEvent();
    });
}

