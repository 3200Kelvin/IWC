import { blockScroll, unblockScroll } from "../../../common/blockScroll";

import './style.scss';

export const useTeamPopup = (block) => {
    const popup = document.querySelector('.team-member-popup');

    if (!popup) {
        return;
    }

    const card = popup.querySelector('.team-member');
    const data = card.querySelector('.team-member__data');
    const imagePlaceholder = card.querySelector('.team-member__person__placeholder');
    const closeBtn = popup.querySelector('.team-member-popup__close');
    const cards = block.querySelectorAll('.team__entry');
    let currentTeamMemberIndex = null;

    const links = [];
    const cache = {};
    const buttons = {
        prev: popup.querySelector('.team-member__button--prev'),
        next: popup.querySelector('.team-member__button--next'),
    };

    const elements = getTeamMemberElements(popup);

    card.style.setProperty('--total', cards.length);

    buttons.prev.addEventListener('click', prevTeamMember);
    buttons.next.addEventListener('click', nextTeamMember);

    const cleanups = [...cards].map((card, index) => {
        const linkElement = card.querySelector('a');
        const link = linkElement.href;
        links[index] = link;
        
        const imageElement = card.querySelector('.team__entry__images');

        const onClick = (event) => {
            if (event.ctrlKey || event.shiftKey || event.altKey) {
                return;
            }
            event.preventDefault();
            handleOpenPopup(link, index, imageElement);
        };

        linkElement.addEventListener('click', onClick)

        return () => linkElement.removeEventListener('click', onClick);
    });

    closeBtn.addEventListener('click', closePopup);

    return () => {
        cleanups.forEach((cleanup) => cleanup());
        closeBtn.removeEventListener('click', closePopup);
        buttons.prev.removeEventListener('click', prevTeamMember);
        buttons.next.removeEventListener('click', nextTeamMember);
    };

    function handleOpenPopup(link, index, imageElement) {
        currentTeamMemberIndex = index;
        card.style.setProperty('--current', currentTeamMemberIndex + 1);

        gsap.set([elements.card, elements.content], { opacity: 0 });

        const fetchPromise = fetchPopupContent(link);
        const openPopupPromise = openPopup(imageElement);

        Promise.all([fetchPromise, openPopupPromise])
            .then(([content, movingImage]) => changePopupContent(content, movingImage));
    }

    function changePopupContent(newContent, movingImage = null) {
        card.scrollTo(0, 0);
        data.scrollTo(0, 0);
        const newCard = newContent.querySelector('.team-member__card');

        const newCardElements = getTeamMemberElements(newCard);
        const newContentElement = newContent.querySelector('.team-member__content');

        changePersonCardData(elements, newCardElements);

        elements.content.innerHTML = newContentElement.innerHTML;

        gsap.to([elements.card, elements.content], { opacity: 1, duration: 0.4 });

        if (movingImage) {
            gsap.timeline()
                .to(movingImage, { opacity: 0, duration: 0.4, delay: 0.2 })
                .add(() => movingImage.remove());
        }
    }

    function handleChange(newIndex) {
        const fetchPromise = fetchPopupContent(links[newIndex]);
        const fadeContentPromise = fadeContent();
        scrollToCard(newIndex);

        Promise.all([fetchPromise, fadeContentPromise])
            .then(([content]) => {
                changePopupContent(content);
                currentTeamMemberIndex = newIndex;
                card.style.setProperty('--current', currentTeamMemberIndex + 1);
            });
    }

    function scrollToCard(index) {
        cards[index].scrollIntoView({ block: 'center', 'inline': 'nearest' });
    }

    function fadeContent() {
        return gsap.to([elements.card, elements.content], { opacity: 0, duration: 0.4 });
    }

    async function openPopup(imageElement) {
        const movingImage = imageElement.cloneNode(true);

        const { x, y, width, height } = imageElement.getBoundingClientRect();

        gsap.set(movingImage, {
            position: 'fixed',
            zIndex: 12,
            top: 0,
            left: 0,
            x: x,
            y: y,
            width: width,
            height: height,
        });

        document.body.appendChild(movingImage);
        
        blockScroll();

        gsap.set(popup, { opacity: 0, display: 'block' });
        const { x: targetX, y: targetY, width: targetWidth, height: targetHeight } = imagePlaceholder.getBoundingClientRect();

        await gsap.timeline()
            .add('show')
            .to(popup, { opacity: 1, duration: 0.8 }, 'show')
            .to(movingImage, {
                x: targetX,
                y: targetY,
                width: targetWidth,
                height: targetHeight,
                duration: 0.8
            }, 'show')
            // .to(movingImage, { opacity: 0, duration: 0.4 })
            // .add(() => {
            //     movingImage.remove();
            // });

        return movingImage;
    }

    function closePopup() {
        return gsap.timeline()
            .to(popup, { opacity: 0, duration: 0.8})
            .to(popup, {  display: 'none' })
            .add(() => unblockScroll());
    }

    function nextTeamMember(event) {
        event.preventDefault();
        const nextIndex = (currentTeamMemberIndex + 1) % links.length;
        handleChange(nextIndex);
    }

    function prevTeamMember(event) {
        event.preventDefault();
        const prevIndex = (currentTeamMemberIndex - 1 + links.length) % links.length;
        handleChange(prevIndex);
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

    function getTeamMemberElements(member) {
        const card = member.querySelector('.team-member__card');
        const person = member.querySelector('.team-member__person');

        const emailLink = member.querySelector('#team-member-email');
        const phoneLink = member.querySelector('#team-member-phone');
        const linkedinLink = member.querySelector('#team-member-linkedin');

        return {
            card,
            person,
            emailLink,
            emailLabel: emailLink?.querySelector('p'),
            phoneLink,
            phoneLabel: phoneLink?.querySelector('p'),
            linkedinLink,
            linkedinLabel: linkedinLink?.querySelector('p'),
            content: member.querySelector('.team-member__content'),
        }
    }

    function changePersonCardData(oldCard, newCard) {
        oldCard.person.innerHTML = newCard.person.innerHTML;

        if (oldCard.emailLink) {
            oldCard.emailLink.setAttribute('href', newCard.emailLink.getAttribute('href'));
            oldCard.emailLabel.textContent = newCard.emailLabel.textContent;
        }
        if (oldCard.phoneLink) {
            oldCard.phoneLink.setAttribute('href', newCard.phoneLink.getAttribute('href'));
            oldCard.phoneLabel.textContent = newCard.phoneLabel.textContent;
        }
        if (oldCard.linkedinLink) {
            oldCard.linkedinLink.setAttribute('href', newCard.linkedinLink.getAttribute('href'));
            oldCard.linkedinLabel.textContent = newCard.linkedinLabel.textContent;
        }
    }
};
