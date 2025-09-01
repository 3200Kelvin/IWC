import { useYoutubeVideo } from '../../../common/youtube';

import './style.scss';

export async function usePostVideo(post) {
    const videoWrapper = post.querySelector('[data-youtube-video="container"]');

    let isPlaying = false;
    
    const {
        play,
        pause,
        cleanup,
    } = await useYoutubeVideo(videoWrapper, onPlay, onPause);

    post.addEventListener('click', onCardClick);

    return () => {
        cleanup();
        post.removeEventListener('click', play);
    };

    function onCardClick() {
        if (isPlaying) {
            pause();
        } else {
            play();
        }
    }

    function onPlay() {
        isPlaying = true;
        videoWrapper.classList.add('playing');
    }

    function onPause() {
        isPlaying = false;
        videoWrapper.classList.remove('playing');
    }
}