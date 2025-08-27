import { SessionStorage } from "../../common/storage";

export const useAnalytics = () => {
    const SESSION_STORAGE_KEY = 'clarity-concent';
    const modal = document.querySelector('.cookie');

    if (!modal) {
        return;
    }

    const reject = modal.querySelector('[data-cookie="reject"]');
    const accept = modal.querySelector('[data-cookie="accept"]');

    initClarity();

    function giveConcent() {
        window.clarity('consentv2', {
            ad_Storage: "denied",
            analytics_Storage: "granted",
        });

        closeModal();
    }

    function rejectConcent() {
        SessionStorage.set(SESSION_STORAGE_KEY, 'rejected');
        closeModal();
    }

    function askForConcent() {
        reject.addEventListener('click', rejectConcent);
        accept.addEventListener('click', giveConcent);
        modal.style.setProperty('display', 'block');
    }

    function closeModal() {
        modal.remove();
    }

    function onClarityLoad() {
        clarity('metadata', (d, upgrade, consent) => {
            const isConcented = consent?.analytics_Storage === 'granted';

            if (!isConcented && !SessionStorage.get(SESSION_STORAGE_KEY)) {
                askForConcent();
            }
        }, false, true, true);
    }

    function initClarity() {
        (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);
            t.async=1;
            t.src="https://www.clarity.ms/tag/"+i;
            t.addEventListener('load', onClarityLoad);
            y=l.getElementsByTagName(r)[0];
            y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "smitg98v81");
    }
};
