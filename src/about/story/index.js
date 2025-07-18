import { getCleanup } from '../../common/helpers';

import { useTimeline } from './timeline';

import './style.scss';

export const useStory = () => {
    const story = document.querySelector('.story');

    if (!story) {
        return;
    }

    return getCleanup(
        useTimeline(story)
    )
};