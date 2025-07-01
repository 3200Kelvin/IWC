import { useServicesStory } from './story';
import { useServicesLine } from './line';
import { useServicesTexts } from './texts';
import { getCleanup } from '../../common/helpers';

import './style.scss';

export const useServicesAnimations = () => {
    const block = document.querySelector('.services');
    if (!block) {
        return;
    }

    return getCleanup(
        useServicesStory(block),
        useServicesLine(block),
        useServicesTexts(block)
    );
};
