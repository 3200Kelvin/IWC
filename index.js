import { usePageTransitions } from "./src/global/transitions";
import { useGlobalScripts, useGlobalOnceScripts } from "./src/global";
import { postReadyEvent } from "./src/global/preloader";
import { getPageNamespace } from "./src/common/helpers";

import { useMainPageScripts } from "./src/main";
import { useAboutPageScripts } from "./src/about";
import { useMediaPageScripts } from "./src/media";
import { useIntelligencePageScripts } from "./src/intelligence";
import { useSolutionsPageScripts } from "./src/solutions";
import { useSolutionPageScripts } from "./src/solution";
import { useContactPageScripts } from "./src/contact";
import { useSignup } from "./src/memberstack/signup";
import { useMembersAreaScripts } from "./src/memberstack/account";
import { useArticlePageScripts } from "./src/article";

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
        console.log(usePageScripts);
        return usePageScripts?.();
    });

    return cleanup;
}

function once() {
    useGlobalOnceScripts();
    
    usePageTransitions(each);
}

function runPageSpecificScript() {
    const pageNamespace = getPageNamespace();
    
    switch (pageNamespace) {
        case 'home':
            return useMainPageScripts();
        case 'about':
            return useAboutPageScripts();
        case 'media':
            return useMediaPageScripts();
        case 'solutions':
            return useSolutionsPageScripts();
        case 'solution':
            return useSolutionPageScripts();
        case 'contact':
            return useContactPageScripts();
        case 'signup':
            return useSignup();
        case 'members-area':
            return useMembersAreaScripts();
        case 'intelligence':
            return useIntelligencePageScripts();
        case 'article':
            return useArticlePageScripts();
        default:
            return () => {};
    }
}

function each() {
    try {
        if (cleanup) {
            cleanup();
            cleanup = null;
        }

        const globalScriptsCleanup = useGlobalScripts();
        const pageScriptCleanup = runPageSpecificScript();

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

