import { useYoutubeVideo } from '../../../common/youtube';

import './style.scss';

export async function usePostVideo(post) {
    const videoWrapper = post.querySelector('[data-youtube-video="container"]');

    const {
        play,
        pause,
        getIsPlaying,
        cleanup,
    } = await useYoutubeVideo(videoWrapper);

    post.addEventListener('click', onCardClick);

    return () => {
        cleanup();
        post.removeEventListener('click', play);
    };

    function onCardClick() {
        if (getIsPlaying()) {
            pause();
        } else {
            play();
        }
    }
}