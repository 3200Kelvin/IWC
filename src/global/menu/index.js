import { blockScroll, unblockScroll } from "../../common/blockScroll/script";
import { getIsMobile } from "../../common/helpers";

import './style.scss';

export const useMenu = () => {
    const button = document.querySelector('.menu-btn');
    const menu = document.querySelector('.menu');
    const links = menu.querySelectorAll('a');

    const MENU_OPENED_CN = 'menu-opened';

    const ANIMATION_TIME = 0.8;
    const ANIMATION_TIME_MOBILE = 0.4;
    let isOpened = false;
    let timeline = null;

    button.addEventListener('click', handleButtonClick);
    links.forEach(link => link.addEventListener('click', close));

    return () => {
        button.removeEventListener('click', handleButtonClick);
        links.forEach(link => link.removeEventListener('click', close));
        document.removeEventListener('click', handleDocumentClick);
    }

    function handleButtonClick(event) {
        event.stopPropagation();
        if (isOpened) {
            close();
        } else {
            open();
        }
    }

    function handleDocumentClick(event) {
        if (menu.contains(event.target)) {
            return;
        }

        if (isOpened) {
            close();
        }
    }

    function open() {
        clearTimeline();
        button.removeEventListener('click', handleButtonClick);
        isOpened = true;
        blockScroll(MENU_OPENED_CN);

        timeline = gsap.timeline().add(showCloseIcon);

        showMenu(timeline);

        timeline
            .add(() => {
                document.addEventListener('click', handleDocumentClick);
            });

        return timeline;
    }

    function close() {
        clearTimeline();
        isOpened = false;
        document.removeEventListener('click', handleDocumentClick);

        timeline = gsap.timeline().add(showOpenIcon);

        hideMenu(timeline);

        timeline
            .add(() => {
                button.addEventListener('click', handleButtonClick);
                unblockScroll(MENU_OPENED_CN);
            });

        return timeline;
    }

    function showMenu(timeline) {
        if (getIsMobile()) {
            timeline.fromTo(menu, { display: 'block', opacity: 0, pointerEvents: 'none' }, { opacity: 1, pointerEvents: 'auto', duration: ANIMATION_TIME_MOBILE });
        } else {
            timeline.fromTo(menu, { display: 'block', transform: 'translateX(100%)' }, { transform: 'translateX(0%)', duration: ANIMATION_TIME });
        }
    }

    function hideMenu(timeline) {
        if (getIsMobile()) {
            timeline
                .to(menu, { opacity: 0, pointerEvents: 'none', duration: ANIMATION_TIME_MOBILE })
                .to(menu, { display: 'none' });
        } else {
            timeline
                .to(menu, { transform: 'translateX(100%)', duration: ANIMATION_TIME })
                .to(menu, { display: 'none' });
        }
    }

    function showCloseIcon() {
        button.classList.add('menu-btn--opened');
    }

    function showOpenIcon() {
        button.classList.remove('menu-btn--opened');
    }

    function clearTimeline() {
        timeline?.kill?.();
    }
};
