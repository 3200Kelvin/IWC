import { blockScroll, unblockScroll } from "../../common/blockScroll/script";

export const useMenu = () => {
    const button = document.querySelector('.menu-btn');
    const buttonIcons = {
        open: button.querySelector('.menu-btn__icon__toggle--open'),
        close: button.querySelector('.menu-btn__icon__toggle--close')
    };
    const menu = document.querySelector('.menu');
    const links = menu.querySelectorAll('a');

    let isOpened = false;

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
        isOpened = true;
        blockScroll();
        document.addEventListener('click', handleDocumentClick);

        return gsap.timeline()
            .add(() => {
                gsap.to(buttonIcons.open, { opacity: 0 });
                gsap.to(buttonIcons.close, { opacity: 1 });
            })
            .fromTo(menu, { display: 'block', transform: 'translateX(100%)' }, { transform: 'translateX(0%)', duration: 0.8 });
    }

    function close() {
        isOpened = false;
        document.removeEventListener('click', handleDocumentClick);

        return gsap.timeline()
            .add(() => {
                gsap.to(buttonIcons.open, { opacity: 1 });
                gsap.to(buttonIcons.close, { opacity: 0 });
            })
            .to(menu, { transform: 'translateX(100%)', duration: 0.8 })
            .to(menu, { display: 'none' })
            .add(() => {
                unblockScroll();
            });
    }
};
