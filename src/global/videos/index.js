import { getCleanup, getIntersectionObserver } from "../../common/helpers";

import './style.scss';

export const useVideos = () => {
    const PLAY_ACTION = 'video-play';

    const intersectionObserver = getIntersectionObserver(0, () => {}, onVideoNotInView);

    const videos = document.querySelectorAll('.video-element video');
    const cleanups = [...videos].map(initVideo);

    document.addEventListener(PLAY_ACTION, handlePlayEvent);

    return getCleanup(
        ...cleanups,
        () => {
            document.removeEventListener(PLAY_ACTION, handlePlayEvent);
            intersectionObserver.disconnect();
        }
    );

    function initVideo(video) {
        const container = video.closest('.video-element');

        const btn = container.querySelector('.video-element__tooltip');
        const btnLabel = btn.querySelector('p');

        const source = video.querySelector('source');
        const src = container.dataset.src;
        source.setAttribute('src', src);
        video.load();

        let pauseTimeout;

        btn.addEventListener('click', play);
        video.addEventListener('pause', onPause);
        video.addEventListener('play', onPlay);
        video.addEventListener('ended', onEnd);

        intersectionObserver.observe(video);

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
            btnLabel.textContent = 'Resume';

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

    function onVideoNotInView(entry) {
        entry.target.pause();
    }
        
    function handlePlayEvent(event) {
        videos.forEach((video) => {
            if (video !== event.detail) {
                video.pause();
            }
        });
    }
};
