(function doRedirect() {
    const link = document.querySelector('a');
    if (link) {
        window.location.href = link.href;
    }
})();
