import { getIntersectionObserver, getIsDesktop } from '../../helpers';

import './style.scss';

export const useSolutionsCardsShift = () => {
    const block = document.querySelector('.solutions-wrapper');

    if (!block || !getIsDesktop()) {
        return;
    }

    const wrapper = block.querySelector('.solutions__cards-wrapper');
    const container = wrapper.querySelector('.solutions__cards');

    const resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(wrapper);
    onResize();

    const scrollTrigger = ScrollTrigger.create({
        trigger: block,
        start: "top top",
        end: "95% bottom",
        scrub: true,
        onUpdate: (self) => {
            container.style.setProperty('--progress', self.progress.toFixed(4));
        },
    });

    const observer = getIntersectionObserver(0, onIntersecting);
    observer.observe(block);

    function onIntersecting() {
        scrollTrigger.refresh();
    }

    return () => {
        resizeObserver.disconnect();
        observer.disconnect();
        scrollTrigger.kill();
    };
    
    function onResize() {
        const distance = container.offsetWidth - wrapper.offsetWidth;
        
        container.style.setProperty('--shift', `${distance}px`);
    }
};
