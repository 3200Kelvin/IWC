export const useTeamMemberLinks = () => {
    const links = document.querySelectorAll('.members-links a');
    const buttons = {
        prev: document.querySelector('.team-member__button--prev'),
        next: document.querySelector('.team-member__button--next')
    };

    const currentLinkIndex = [...links].findIndex((link) => link.href === window.location.href);

    const linkToNext = currentLinkIndex === links.length - 1 ? links[0] : links[currentLinkIndex + 1];
    const linkToPrev = currentLinkIndex === 0 ? links[links.length - 1] : links[currentLinkIndex - 1];

    buttons.prev.href = linkToPrev.href;
    buttons.next.href = linkToNext.href;
};
