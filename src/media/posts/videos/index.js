// import { useYoutubeVideo } from '../../../common/youtube';
import { useVideo } from '../../../common/video';

import './style.scss';

export async function usePostVideo(post) {
    const videoWrapper = post.querySelector('[data-video="container"]');

    const {
        play,
        pause,
        getIsPlaying,
        cleanup,
    } = useVideo(videoWrapper);

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