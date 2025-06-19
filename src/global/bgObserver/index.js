import './style.scss';

export const useBgObserver = () => {
    const blocks = document.querySelectorAll('.approach, .strategy-and-solutions');
    const elements = document.querySelectorAll('.fixed-content, .menu a');

    const intersectionObservers = [];

    const elementObservers = [...elements].map((element, index) => {
        element.classList.add('bg-toggled');

        const elementObserver = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setObserver();
            } else {
                cleanObserver(index);
            }
        }, { threshold: [0] });

        elementObserver.observe(element);

        return elementObserver;

        function setObserver() {
            const { top, bottom } = element.getBoundingClientRect();

            const viewportHeight = window.innerHeight;
            const topPercent = (top / viewportHeight) * 100;
            const bottomPercent = 100 * (1 - (bottom / viewportHeight));

            const rootMargin = `-${topPercent}% 50% -${bottomPercent}% 50%`;

            cleanObserver(index);

            const observer = new IntersectionObserver((entries) => {
                const isIntersecting = entries.reduce((acc, entry) => {
                    return acc || entry.isIntersecting;
                }, false);
                
                element.classList.toggle('bg-change', isIntersecting);
                element.style.removeProperty('color');
            }, { rootMargin: rootMargin, threshold: [0] });

            blocks.forEach((block) => observer.observe(block));

            intersectionObservers[index] = observer;
        }
    });

    function cleanObserver(index) {
        if (intersectionObservers[index]) {
            intersectionObservers[index].disconnect();
            intersectionObservers[index] = null;
        }
    }

    const cleanup = () => {
        elementObservers.forEach((observer) => observer?.disconnect?.());
        intersectionObservers.forEach((observer) => observer?.disconnect?.());
    };

    return cleanup;
};
