import { getCleanup } from "../../common/helpers";

import './style.scss';

export const useVideos = () => {
    const PLAY_ACTION = 'video-play';

    const videos = document.querySelectorAll('.video-element video');
    const cleanups = [...videos].map(initVideo);

    document.addEventListener(PLAY_ACTION, handlePlayEvent);

    return getCleanup(
        ...cleanups,
        () => document.removeEventListener(PLAY_ACTION, handlePlayEvent)
    );

    function initVideo(video) {
        const container = video.closest('.video-element');

        const btn = container.querySelector('.tooltip-btn');

        const source = video.querySelector('source');
        const src = container.dataset.src;
        source.setAttribute('src', src);
        video.load();

        let pauseTimeout;

        btn.addEventListener('click', play);
        video.addEventListener('pause', onPause);
        video.addEventListener('play', onPlay);
        video.addEventListener('ended', onEnd);

        return () => {
            btn.removeEventListener('click', play);
            video.removeEventListener('pause', onPause);
            video.removeEventListener('play', onPlay);
            video.removeEventListener('ended', onEnd);
            clearTimeout(pauseTimeout);
        };

        function play() {
            video.play().catch(console.warn);
            document.dispatchEvent(new CustomEvent(PLAY_ACTION, { detail: video }));
        }

        function onPlay() {
            clearTimeout(pauseTimeout);

            container.classList.add('video-element--playing');
        }

        function onPause() {
            clearTimeout(pauseTimeout);

            pauseTimeout = setTimeout(() => {
                container.classList.remove('video-element--playing');
            }, 500);
        }

        function onEnd() {
            if (!!document.fullscreenElement && document.fullscreenElement === video) {
                document.exitFullscreen().catch(() => {});
            }
        }
    }
        
    function handlePlayEvent(event) {
        videos.forEach((video) => {
            if (video !== event.detail) {
                video.pause();
            }
        });
    }
};
