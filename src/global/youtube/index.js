export const YT_READY_EVENT_NAME = 'YT_READY';

export const initYoutubeVideos = () => {
    window.onYouTubeIframeAPIReady = () => {
        document.dispatchEvent(new CustomEvent(YT_READY_EVENT_NAME));
    };

    loadYoutubeScript();

    function loadYoutubeScript() {
        const script = document.createElement('script');
        script.src = "https://www.youtube.com/iframe_api";
        document.body.appendChild(script);
    }
};
