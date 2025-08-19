import { useRunner } from "./index";

export const useRunners = () => {
    const runners = document.querySelectorAll('[data-animation="runner"]');
    if (!runners.length) {
        return;
    }

    runners.forEach((block) => {
        const { toggleRunner } = useRunner(block, '[data-animation="runner-entity"]', '[data-animation="runner-entry"]');

        block.animate = () => toggleRunner(true);
        block.reverse = () => toggleRunner(false);
        block.setAttribute('data-animation-trigger', 'screen');
    });
};
