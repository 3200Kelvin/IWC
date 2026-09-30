import { useRunner } from "../../common/runner";
import { useElementAnimation } from "../../common/helpers";

export const useRunners = () => {
    const runners = document.querySelectorAll('[data-animation="runner"]');
    if (!runners.length) {
        return;
    }

    runners.forEach((block) => {
        return useElementAnimation([block], () => {
            const { toggleRunner, cleanup } = useRunner(block, '[data-animation="runner-entity"]', '[data-animation="runner-entry"]');

            block.dataset.animationOffset = 0;

            return {
                animate: () => toggleRunner(true),
                reverse: () => toggleRunner(false),
                cleanup,
            };
        });
    });
};
