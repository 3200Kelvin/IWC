import { getUserData, getIsUserSubscribed, PAGES } from "../../common/memberstack";
import { useTooltip } from "../../common/tooltip";
import { isTouchscreen } from "../../common/helpers";
import { useYoutubeVideo } from "../../common/youtube";

import './block.scss';
import './common.scss';
import './insights.scss';
import './videos.scss';

export const useMediaPosts = () => {
    const media = document.querySelector('.media');

    if (!media) {
        return;
    }

    const container = document.querySelector('.media__content');
    const posts = container.querySelectorAll('[data-gated-post="post"]');
    const tooltip = container.querySelector('.media__enter-button');
    let isSubscribed = false;
    const cleanups = [];

    getUserData().then(init);

    return () => {
        cleanups.forEach(cleanup => cleanup?.());
    };

    function init(member) {
        isSubscribed = getIsUserSubscribed(member);

        if (isSubscribed) {
            container.classList.add('subscribed');
        }

        const lockedPosts = [...posts].filter(checkPost);

        if (!isTouchscreen) {
            const tooltipCleanup = useTooltip(tooltip, media, lockedPosts);
            cleanups.push(tooltipCleanup);
        }
    }

    function checkPost(post) {
        const isOpen = !!post.querySelector('[data-gated-post="is-open"]');

        const shouldUnlock = isOpen || isSubscribed;
        
        setPostLink(post, shouldUnlock);
        checkPostVideo(post, shouldUnlock);
        unblockPost(post, shouldUnlock);

        return !shouldUnlock;
    }

    function unblockPost(post, shouldUnlock = false) {
        post.classList.toggle('unblocked', shouldUnlock);
    }

    async function checkPostVideo(post, shouldUnlock = false) {
        const videoWrapper = post.querySelector('[data-youtube-video="container"]');

        if (!videoWrapper) {
            return;
        }
        
        if (!shouldUnlock) {
            videoWrapper.removeAttribute('data-src');
            return;
        }

        let isPlaying = false;
        
        const {
            play,
            pause,
            cleanup,
        } = await useYoutubeVideo(videoWrapper, onPlay, onPause);

        post.addEventListener('click', onCardClick);

        cleanups.push(() => {
            cleanup();
            post.removeEventListener('click', play);
        });

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

    function setPostLink(post, shouldUnlock = false) {
        const trueLink = post.querySelector('[data-gated-post="true-link"]');

        if (trueLink) {
            const href = trueLink.getAttribute('href');
            trueLink.remove();

            const link = post.querySelector('[data-gated-post="link"]');

            if (link && shouldUnlock) {
                link.setAttribute('href', href);
            }
        }
    }
}