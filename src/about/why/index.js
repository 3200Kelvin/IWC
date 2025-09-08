import { useYoutubeVideo } from '../../common/youtube';

import './style.scss';

export const useWhy = async () => {
    const block = document.querySelector('.why');
    if (!block) {
        return;
    }

    const videoWrapper = block.querySelector('[data-youtube-video="container"]');

    const {
        play,
        pause,
        getIsPlaying,
        cleanup,
    } = await useYoutubeVideo(videoWrapper);

    videoWrapper.addEventListener('click', onCardClick);

    return () => {
        cleanup();
        videoWrapper.removeEventListener('click', play);
    };

    function onCardClick() {
        if (getIsPlaying()) {
            pause();
        } else {
            play();
        }
    }
}
