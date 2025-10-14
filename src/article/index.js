export const useArticlePageScripts = () => {
    const backLink = document.querySelector('.insights__back a');

    if (!backLink) {
        return;
    }

    backLink.addEventListener('click', onLinkClick);

    return () => backLink.removeEventListener('click', onLinkClick);

    function onLinkClick(event) {
        event.preventDefault();
        history.back();
    }
};

export { useArticlePageScripts as usePageScripts };
