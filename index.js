import { usePageTransitions } from "./src/global/transitions";
import { useGlobalScripts, useGlobalOnceScripts } from "./src/global";
import { postReadyEvent } from "./src/global/preloader";
import { getPageNamespace } from "./src/common/helpers";

const MODULE_MAP = {
    home: 'main',
    about: 'about',
    media: 'media',
    solutions: 'solutions',
    solution: 'solution',
    contact: 'contact',
    signup: 'memberstack/signup',
    'members-area': 'memberstack/account',
    intelligence: 'intelligence',
    article: 'article',
};

const MODULE_IMPORTS = {
    home: () => import('./src/main/index.js'),
    about: () => import('./src/about/index.js'),
    media: () => import('./src/media/index.js'),
    solutions: () => import('./src/solutions/index.js'),
    solution: () => import('./src/solution/index.js'),
    contact: () => import('./src/contact/index.js'),
    signup: () => import('./src/memberstack/signup/index.js'),
    'members-area': () => import('./src/memberstack/account/index.js'),
    intelligence: () => import('./src/intelligence/index.js'),
    article: () => import('./src/article/index.js'),
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
    // const modulePath = MODULE_MAP[namespace];

    // if (!modulePath) {
    //     return null;
    // }

    // const currentScriptDir = new URL('.', import.meta.url).href;
    // const fullPath = new URL(`src/${modulePath}/index.js`, currentScriptDir).href;

    // const cleanup = await import(fullPath).then(({ usePageScripts }) => {
    //     return usePageScripts?.();
    // });

    const moduleImporter = MODULE_IMPORTS[namespace];

    if (!moduleImporter) {
        return null;
    }

    const cleanup = await moduleImporter().then(({ usePageScripts }) => {
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

async function init() {
    document.fonts.ready.then(async () => {
        if (!isInitialized) {
            once();
            isInitialized = true;
        }
        await each();
        postReadyEvent();
    });
}

