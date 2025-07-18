export const useVideos = () => {
    const videos = document.querySelectorAll('.video-element');
    videos.forEach(initVideo);

    function initVideo(container) {
        const video = container.querySelector('video');
        const source = video.querySelector('source');
        const src = container.dataset.src;
        source.setAttribute('src', src);
        video.load();
    }
};
