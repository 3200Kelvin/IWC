import { getUserData, getIsUserSubscribed } from "../../common/memberstack";

import './style.scss';

export const useMediaPosts = () => {
    const posts = document.querySelectorAll('[data-gated-post="post"]');
    let member = null;

    getUserData().then(init);

    function init(memberData) {
        member = memberData;
        posts.forEach(checkPost);
    }

    function checkPost(post) {
        const isOpen = !!post.querySelector('[data-gated-post="is-open"]');

        const shouldUnlock = isOpen || getIsUserSubscribed(member);
        
        setPostLink(post, shouldUnlock);
        checkPostVideo(post, shouldUnlock);
        unblockPost(post, shouldUnlock);
    }

    function unblockPost(post, shouldUnlock = false) {
        post.classList.toggle('unblocked', shouldUnlock);
    }

    function checkPostVideo(post, shouldUnlock = false) {
        const video = post.querySelector('.w-video');

        if (!shouldUnlock && video) {
            video.remove();
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