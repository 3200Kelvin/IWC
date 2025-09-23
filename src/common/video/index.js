import { getIntersectionObserver, noop } from "../../common/helpers";
import { api } from "../api";

import './style.scss';

const PLAY_ACTION = 'video-play';

export const useVideo = (container, { onPlay = noop, onPause = noop, onEnd = noop, onIntersection = noop } = {}) => {
    const { videoUrl } = container.dataset;

    if (!videoUrl) {
        return console.warn('Video name not found', container);
    }

    const video = container.querySelector('video');
    if (!video) {
        return console.warn('Video element not found', container);
    }

    const trigger = container.querySelector('[data-video="trigger"]');

    const intersectionObserver = getIntersectionObserver(0, handleVideoObserver, handleVideoObserver);
    intersectionObserver.observe(container);
    let pauseTimeout;
    let isLoadingInitialized = false;

    video.addEventListener('click', handleClick);
    video.addEventListener('pause', handlePause);
    video.addEventListener('play', handlePlay);
    video.addEventListener('ended', handleEnd);

    return { play, pause, getIsPlaying, cleanup };

    function cleanup() {
        if (trigger) {
            trigger.removeEventListener('click', play);
        }
        video.removeEventListener('click', handleClick);
        video.removeEventListener('pause', handlePause);
        video.removeEventListener('play', handlePlay);
        video.removeEventListener('ended', handleEnd);
        intersectionObserver.disconnect();
        document.removeEventListener(PLAY_ACTION, onPlayEvent);
    }

    function loadVideo() {
        if (isLoadingInitialized) {
            return;
        }

        isLoadingInitialized = true;

        api.getVideoUrl(videoUrl)
            .then((url) => {
                if (!url) {
                    return console.warn('Could not get signed video url', videoUrl);
                }

                const source = video.querySelector('source');
                source.setAttribute('src', url);
                video.load();

                if (trigger) {
                    trigger.addEventListener('click', play);
                }
                document.addEventListener(PLAY_ACTION, onPlayEvent);
            })
            .catch((error) => console.error(error));
    }

    function play() {
        video.play().catch(console.warn);
    }

    function pause() {
        video.pause();
    }

    function getIsPlaying() {
        return !video.paused && !video.ended;
    }

    function handlePlay() {
        clearTimeout(pauseTimeout);
        document.dispatchEvent(new CustomEvent(PLAY_ACTION, { detail: video }));
        container.setAttribute('data-video-playing', true);

        onPlay();
    }

    function handleClick(event) {
        event.stopPropagation();
        return;
    }

    function handlePause() {
        onPause();

        pauseTimeout = setTimeout(() => {
            container.removeAttribute('data-video-playing');
        }, 500);
    }

    function handleEnd() {
        onEnd();

        if (!!document.fullscreenElement && document.fullscreenElement === video) {
            document.exitFullscreen().catch(() => {});
        }
    }

    function onPlayEvent(event) {
        if (event.detail !== video) {
            pause();
        }
    }

    function handleVideoObserver(entry) {
        onIntersection(entry, intersectionObserver);

        if (entry.isIntersecting) {
            loadVideo();
        } else {
            video.pause?.();
        }
    }
};
