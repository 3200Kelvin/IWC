import './style.scss';

export const useBgObserver = () => {
    const blocks = document.querySelectorAll('[data-color-change], .approach, .services__end, .strategy-and-solutions');
    const elements = document.querySelectorAll('.fixed-content, .menu a');

    if (!blocks.length) {
        elements.forEach((element) => toggleBg(element));
        return;
    }

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

            const intersections = new Set([]);

            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        intersections.add(entry.target);
                    } else {
                        intersections.delete(entry.target);
                    }
                });

                const isIntersecting = intersections.size > 0;
                
                toggleBg(element, isIntersecting);
            }, { rootMargin: rootMargin, threshold: [0] });

            blocks.forEach((block) => observer.observe(block));

            intersectionObservers[index] = observer;
        }
    });

    function toggleBg(element, isChanged = false) {
        element.classList.toggle('bg-change', isChanged);
        element.style.removeProperty('color');
    }

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
