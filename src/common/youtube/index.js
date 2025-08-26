import { YT_READY_EVENT_NAME } from "../../global/youtube";

const YT_PLAY_EVENT_NAME = 'YT_PLAY';

export const useYoutubeVideo = async (wrapper, onPlay = () => {}, onPause = () => {}) => {
    const placeholder = wrapper.querySelector('[data-youtube-video="placeholder"]');
    const { src } = wrapper.dataset;
    wrapper.removeAttribute('data-src');
    const videoId = getVideoId(src);

    const YT = await waitForYT();

    placeholder.id = videoId;
    const playEvent = new CustomEvent(YT_PLAY_EVENT_NAME, { detail: { videoId } });

    document.addEventListener(YT_PLAY_EVENT_NAME, onPlayEvent);

    const player = new YT.Player(videoId, {
        height: '390',
        width: '640',
        videoId,
        playerVars: {
            'playsinline': 1,
        },
        events: {
            'onStateChange': onPlayerStateChange
        },
    });

    return {
        play,
        pause,
        cleanup,
    };

    function waitForYT() {
        if (window.YT) {
            return Promise.resolve(window.YT);
        }

        return new Promise((resolve) => {
            document.addEventListener(YT_READY_EVENT_NAME, () => {
                resolve(window.YT);
            });
        });
    }

    function cleanup() {
        player.destroy();
        document.removeEventListener(YT_PLAY_EVENT_NAME, onPlayEvent);
    }

    function play() {
        player.playVideo();
    }

    function pause() {
        player.pauseVideo();
    }

    function onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.PLAYING) {
            onPlay();
            document.dispatchEvent(playEvent);
        } else if (event.data == YT.PlayerState.PAUSED) {
            onPause();
        }
    }

    function onPlayEvent(event) {
        if (event.detail.videoId !== videoId) {
            pause();
        }
    }

    function getVideoId(url){
        const urlParams = new URL(url).searchParams;
        return urlParams.get('v');
    }
};
