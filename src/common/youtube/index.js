import { getIntersectionObserver } from "../helpers";
import { YT_READY_EVENT_NAME } from "../../global/youtube";

const YT_PLAY_EVENT_NAME = 'YT_PLAY';

import './style.scss';

export const useYoutubeVideo = async (wrapper, onPlay = () => {}, onPause = () => {}) => {
    const placeholder = wrapper.querySelector('[data-youtube-video="placeholder"]');
    const { src } = wrapper.dataset;
    wrapper.removeAttribute('data-src');
    const videoId = getVideoId(src);

    const YT = await waitForYT();
    const intersectionObserver = getIntersectionObserver(0, () => {}, pause);

    placeholder.id = videoId;
    const playEvent = new CustomEvent(YT_PLAY_EVENT_NAME, { detail: { videoId } });

    document.addEventListener(YT_PLAY_EVENT_NAME, onPlayEvent);
    intersectionObserver.observe(wrapper);

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
        getIsPlaying,
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
        intersectionObserver.disconnect();
    }

    function play() {
        player.playVideo();
    }

    function pause() {
        player?.pauseVideo?.();
    }

    function getIsPlaying() {
        return player?.getPlayerState?.() === YT.PlayerState.PLAYING;
    }

    function onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.PLAYING) {
            onPlay();
            wrapper.classList.add('playing');
            document.dispatchEvent(playEvent);
        } else if (event.data == YT.PlayerState.PAUSED) {
            wrapper.classList.remove('playing');
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
