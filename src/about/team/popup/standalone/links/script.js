export const useTeamMemberLinks = (block) => {
    const links = document.querySelectorAll('.members-links a');
    const buttons = {
        prev: block.querySelector('.team-member__button--prev'),
        next: block.querySelector('.team-member__button--next')
    };

    const currentLinkIndex = [...links].findIndex((link) => link.href === window.location.href);

    console.log(links.length, currentLinkIndex);
    block.style.setProperty('--total', links.length);
    block.style.setProperty('--current', currentLinkIndex + 1);

    const linkToNext = currentLinkIndex === links.length - 1 ? links[0] : links[currentLinkIndex + 1];
    const linkToPrev = currentLinkIndex === 0 ? links[links.length - 1] : links[currentLinkIndex - 1];

    buttons.prev.href = linkToPrev.href;
    buttons.next.href = linkToNext.href;
};
