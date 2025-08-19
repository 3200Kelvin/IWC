import { useRunner } from '../../../common/runner'; 
import { getIntersectionObserver, getCleanup } from '../../../common/helpers';

export const usePastEventsRunner = (block) => {
    const { toggleRunner, cleanup } = useRunner(block, '.past-events__runner', '.past-events__runner__entry');

    const observer = getIntersectionObserver(0, () => toggleRunner(true), () => toggleRunner(false));
    observer.observe(block);

    return getCleanup(
        cleanup,
        () => observer.disconnect(),
    )
};