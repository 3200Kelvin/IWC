import { getUserData, getIsUserSubscribed } from "../../common/memberstack";
import { useTooltip } from "../../common/tooltip";
import { isTouchscreen } from "../../common/helpers";
import { usePostVideo } from "./videos";

import './block.scss';
import './common.scss';
import './insights.scss';

export const useIntelligencePosts = () => {
    const media = document.querySelector('.media');

    if (!media) {
        return;
    }
    
    const cleanups = [];

    const posts = media.querySelectorAll('.media__content [data-gated-post="post"]');

    posts.forEach((post) => {
        post.classList.add('unblocked');
        checkPostVideo(post);
    });

    return () => {
        cleanups.forEach(cleanup => cleanup?.());
    };

    async function checkPostVideo(post) {
        const videoWrapper = post.querySelector('[data-video="container"]');

        if (!videoWrapper) {
            return;
        }

        const cleanup = await usePostVideo(post);
        cleanups.push(cleanup);
    }
};


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
        const videoWrapper = post.querySelector('[data-video="container"]');

        if (!videoWrapper) {
            return;
        }
        
        if (!shouldUnlock) {
            videoWrapper.removeAttribute('data-video-url');
            return;
        }

        const cleanup = await usePostVideo(post);
        cleanups.push(cleanup);
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