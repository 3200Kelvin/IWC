import { getCleanup, noop } from "../../common/helpers";
import { useVideo } from "../../common/video";

import './style.scss';

export const useVideos = () => {
    const videos = document.querySelectorAll('[data-video="container"][data-init="auto"]');

    const cleanups = [...videos].map((container) => {
        const playCaption = container.querySelector('.tooltip-btn__label p');

        const onPause = playCaption ? () => playCaption.textContent = 'Resume' : noop;

        const { cleanup } = useVideo(container, { onIntersection, onPause });
        return cleanup;
    });

    return getCleanup(...cleanups);

    function onIntersection(entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
        } else {
            entry.target.video?.pause?.();
            entry.target.classList.remove('in-view');
        }
    }
};
