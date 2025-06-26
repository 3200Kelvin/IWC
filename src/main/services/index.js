import { useServicesStory } from './story';
import { useServicesLine } from './line';
import { useServicesTexts } from './texts';

import './style.scss';

export const useServicesAnimations = () => {
    const block = document.querySelector('.services');
    if (!block) {
        return;
    }

    const cleanups = [
        useServicesStory(block),
        useServicesLine(block),
        useServicesTexts(block)
    ];

    return () => cleanups.forEach((cleanup) => cleanup?.());
};
