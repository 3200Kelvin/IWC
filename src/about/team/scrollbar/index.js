import './style.scss';

export const useTeamScrollbar = (team) => {
    const list = team.querySelector('.team__list');
    const progress = team.querySelector('.team__progress__bar');

    setProgress();
    list.addEventListener('scroll', setProgress);

    return () => {
        list.removeEventListener('scroll', setProgress);
    };

    function setProgress() {
        const scrollLeft = list.scrollLeft;
        const scrollWidth = list.scrollWidth;
        const elementWidth = list.clientWidth;
        const scrollProgress = (scrollLeft + elementWidth) / scrollWidth;

        progress.style.setProperty('--progress', scrollProgress);
    }
};
