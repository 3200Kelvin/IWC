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
        const isOpen = post.querySelector('[data-gated-post="is-open"]');
        const trueLink = post.querySelector('[data-gated-post="true-link"]');
        const href = trueLink.getAttribute('href');
        trueLink.remove();

        if (isOpen || getIsUserSubscribed(member)) {
            return unblockPost(post, href);
        }
    }

    function unblockPost(post, href) {
        const link = post.querySelector('[data-gated-post="link"]');

        link.setAttribute('href', href);
        post.classList.add('unblocked');
    }
}