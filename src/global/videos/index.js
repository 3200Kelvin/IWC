import { getCleanup, getIntersectionObserver } from "../../common/helpers";

import './style.scss';

export const useVideos = () => {
    const PLAY_ACTION = 'video-play';

    const intersectionObserver = getIntersectionObserver(0, handleVideoObserver, handleVideoObserver);

    const elements = document.querySelectorAll('.video-element');
    const cleanups = [...elements].map(initVideo);

    return getCleanup(
        ...cleanups,
        () => {
            intersectionObserver.disconnect();
        }
    );

    function initVideo(container) {
        intersectionObserver.observe(container);
        
        const video = container.querySelector('video');

        if (!video) {
            return;
        }

        const btn = container.querySelector('.video-element__tooltip');
        const btnLabel = btn.querySelector('p');

        const source = video.querySelector('source');
        const src = container.dataset.src;
        source.setAttribute('src', src);
        video.load();

        container.video = video;

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

    function handleVideoObserver(entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
        } else {
            entry.target.video?.pause?.();
            entry.target.classList.remove('in-view');
        }
    }
};
