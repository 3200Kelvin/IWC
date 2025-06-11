import { useServicesStory } from './story';
import { useServicesLine } from './line';

import './style.scss';

export const useServicesAnimations = () => {
    const cleanups = [
        useServicesStory(),
        useServicesLine()
    ];

    return () => cleanups.forEach((cleanup) => cleanup?.());
};
