(function useVersion() {
    const SESSION_STORAGE_KEY = 'is-dev';

    const isStoredDev = sessionStorage.getItem(SESSION_STORAGE_KEY) === 'true';

    if (isStoredDev) {
        setDevScripts();
        return;
    }

    const isUrlDev = window.location.href.includes('dev=true');

    if (isUrlDev) {
        sessionStorage.setItem(SESSION_STORAGE_KEY, 'true');
        setDevScripts();
        return;
    }

    setStagingScripts();

    function setDevScripts() {
        const script = document.createElement('script');
        script.type = 'module';
        script.defer = true;
        script.src = 'http://localhost:5173/index.js';
        appendElement([script]);
    }

    function setStagingScripts() {
        const timestamp = new Date().getTime();

        const script = document.createElement('script');
        script.type = 'module';
        script.defer = true;
        script.src = `https://3200kelvin.github.io/IWC/dist/index.js?v=${timestamp}`;

        const style1 = document.createElement('link');
        style1.type = 'text/css';
        style1.rel = 'stylesheet';
        style1.href = `https://3200kelvin.github.io/IWC/dist/index.css?v=${timestamp}`;

        const style2 = document.createElement('link');
        style2.type = 'text/css';
        style2.rel = 'stylesheet';
        style2.href = `https://3200kelvin.github.io/IWC/dist/index2.css?v=${timestamp}`;

        appendElement([script, style1, style2]);
    }

    function appendElement(elements) {
        document.currentScript.after(...elements);
    }
})();