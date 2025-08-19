import './style.scss';

export const useButtonScroll = (container, entries, backBtn, forwardBtn) => {
    let step = 0;

    container.classList.add('hor-scroll');
    backBtn.classList.add('hor-scroll-button');
    forwardBtn.classList.add('hor-scroll-button');

    const resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(container);

    backBtn.addEventListener('click', scrollLeft);
    forwardBtn.addEventListener('click', scrollRight);
    container.addEventListener('scroll', onScroll);

    onScroll();

    return () => {
        resizeObserver.disconnect();
        backBtn.removeEventListener('click', scrollLeft);
        forwardBtn.removeEventListener('click', scrollRight);
        container.removeEventListener('scroll', onScroll);
    };

    function onResize() {
        const { left: firstEntryLeft } = entries[0].getBoundingClientRect();
        const { left: secondEntryLeft } = entries[1].getBoundingClientRect();

        step = secondEntryLeft - firstEntryLeft;
    }

    function scrollLeft() {
        if (container.scrollLeft <= 0) {
            container.scrollLeft = 0;
            return;
        }

        const targetScroll = container.scrollLeft - step;

        scrollContainer(targetScroll);
    }

    function scrollRight() {
        if (container.scrollLeft >= container.scrollWidth - container.clientWidth) {
            container.scrollLeft = container.scrollWidth - container.clientWidth;
            return;
        }

        const targetScroll = container.scrollLeft + step;

        scrollContainer(targetScroll);
    }

    function scrollContainer(to) {
        container.scrollTo({ left: to, behavior: 'smooth' });
    }

    function onScroll(event) {
        backBtn.classList.toggle('disabled', container.scrollLeft <= 0);
        forwardBtn.classList.toggle('disabled', container.scrollLeft >= container.scrollWidth - container.clientWidth);
    }
};
