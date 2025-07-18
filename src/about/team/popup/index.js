import { blockScroll, unblockScroll } from "../../../common/blockScroll";

import './style.scss';

export const useTeamPopup = (block) => {
    const popup = document.querySelector('.team-member-popup');

    if (!popup) {
        return;
    }

    const closeBtn = popup.querySelector('.team-member-popup__close');
    const cards = block.querySelectorAll('.team__entry');
    let currentTeamMemberIndex = null;

    const links = [];
    const cache = {};
    const buttons = {
        prev: null,
        next: null,
    };

    const cleanups = [...cards].map((card, index) => {
        const link = card.href;
        links[index] = link;

        const onClick = (event) => {
            if (event.ctrlKey || event.shiftKey || event.altKey) {
                return;
            }
            event.preventDefault();
            handleOpenPopup(link, index);
        };

        card.addEventListener('click', onClick)

        return () => card.removeEventListener('click', onClick);
    });

    closeBtn.addEventListener('click', closePopup);

    return () => {
        cleanups.forEach((cleanup) => cleanup());
        closeBtn.removeEventListener('click', closePopup);
    };

    function handleOpenPopup(link, index) {
        currentTeamMemberIndex = index;

        fetchPopupContent(link).then(openPopup);
    }

    function changePopupContent(newContent) {
        const existingContent = popup.querySelector('.team-member');

        const oldCard = existingContent.querySelector('.team-member__card');
        const oldContent = existingContent.querySelector('.team-member__content');

        oldCard.replaceWith(newContent.querySelector('.team-member__card'));
        oldContent.replaceWith(newContent.querySelector('.team-member__content'));
    }

    function openPopup(content) {
        blockScroll();
        popup.appendChild(content.cloneNode(true));

        buttons.prev = popup.querySelector('.team-member__button--prev');
        buttons.next = popup.querySelector('.team-member__button--next');

        buttons.prev.addEventListener('click', prevTeamMember);
        buttons.next.addEventListener('click', nextTeamMember);

        popup.classList.add('team-member-popup--open');
    }

    function closePopup() {
        popup.classList.remove('team-member-popup--open');

        const existingContent = popup.querySelector('.team-member');

        buttons.prev?.removeEventListener('click', prevTeamMember);
        buttons.next?.removeEventListener('click', nextTeamMember);

        if (existingContent) {
            existingContent.remove();
        }

        unblockScroll();
    }

    function nextTeamMember(event) {
        event.preventDefault();
        const nextIndex = (currentTeamMemberIndex + 1) % links.length;
        fetchPopupContent(links[nextIndex]).then(changePopupContent);
        currentTeamMemberIndex = nextIndex;
    }

    function prevTeamMember(event) {
        event.preventDefault();
        const prevIndex = (currentTeamMemberIndex - 1 + links.length) % links.length;
        fetchPopupContent(links[prevIndex]).then(changePopupContent);
        currentTeamMemberIndex = prevIndex;
    }

    function fetchPopupContent(link) {
        if (cache[link]) {
            return Promise.resolve(cache[link].cloneNode(true));
        }

        return fetch(link)
            .then((response) => response.text())
            .then((html) => {
                const parser = new DOMParser()
                const doc = parser.parseFromString(html, "text/html")
                const content = doc.querySelector('.team-member');

                cache[link] = content;

                return content.cloneNode(true);
            })
            .catch(error => {
                console.error('Failed to fetch page: ', error)
            });
    }
};
