import { useVideo } from '../../common/video';

import './style.scss';

export const useWhy = async () => {
    const block = document.querySelector('.why');
    if (!block) {
        return;
    }

    const videoWrapper = block.querySelector('[data-video="container"]');
    return useVideo(videoWrapper);
}
