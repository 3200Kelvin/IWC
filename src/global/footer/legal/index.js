export const useLegalPopup = () => {
    const popup = document.querySelector('.legal__disclaimer');
    const closeIcon = popup.querySelector('.legal__disclaimer__close');
    const button = document.querySelector('.legal__entry--disclaimer');

    button.addEventListener('click', onButtonClick);

    return () => {
        button.removeEventListener('click', onButtonClick);
        document.removeEventListener('click', onDocumentClick);
    };

    function onButtonClick(event) {
        event.stopPropagation();
        showPopup();
    }

    function onDocumentClick(event) {
        if (!popup.contains(event.target) || closeIcon.contains(event.target)) {
            closePopup();
        }
    }

    function closePopup() {
        document.removeEventListener('click', onDocumentClick);

        gsap.timeline()
            .add(() => {
                gsap.to(button, { opacity: 0.5, clearProps: 'all' });
            })
            .to(popup, { opacity: 0, pointerEvents: 'none', duration: 0.4 })
            .to(popup, { display: 'none' })
            .add(() => {
                button.addEventListener('click', onButtonClick);
            });
    }

    function showPopup() {
        button.removeEventListener('click', onButtonClick);

        gsap.timeline()
            .add(() => {
                gsap.to(button, { opacity: 1 });
            })
            .to(popup, { display: 'block', opacity: 0 })
            .to(popup, { opacity: 1, pointerEvents: 'auto', duration: 0.4 })
            .add(() => {
                document.addEventListener('click', onDocumentClick);
            });
    }
};
