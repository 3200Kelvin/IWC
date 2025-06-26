import './style.scss';

export const setTextBlur = (element) => {
    const CLASS_NAMES = {
        BASE: 'text-unblur',
        LINE: 'text-unblur__line',
        ELEMENT: 'text-unblur__word',
        TRANSITION: 'text-unblur__transition',
        APPEARED: 'text-unblur__appeared',
    };

    element.classList.add(CLASS_NAMES.BASE);

    const split = SplitText.create(element, {
        type: "lines, words",
        linesClass: CLASS_NAMES.LINE,
        wordsClass: CLASS_NAMES.ELEMENT,
    });

    const entries = split.words;

    const STAGGER = 0.005;

    entries.forEach((line, index) => {
        line.style.setProperty('--delay', `${STAGGER * index}s`);
    });

    let cleanup;

    const animate = () => {
        return new Promise((res) => {
            const lastEntry = entries[entries.length - 1];

            cleanup = () => {
                lastEntry.removeEventListener('transitionend', onTransitionEnd);
                cleanup = null;
            };

            const onTransitionEnd = (event) => {
                if (event.propertyName === 'opacity') {
                    element.classList.remove(CLASS_NAMES.TRANSITION);

                    cleanup?.();
                    res();
                }
            };

            lastEntry.addEventListener('transitionend', onTransitionEnd);

            element.classList.add(CLASS_NAMES.TRANSITION);

            setTimeout(() => {
                entries.forEach((entry) => {
                    element.classList.add(CLASS_NAMES.APPEARED);
                });
            }, 10)
        });
    }

    const reset = () => {
        cleanup?.();

        element.classList.remove(CLASS_NAMES.TRANSITION, CLASS_NAMES.APPEARED);
        element.classList.add(CLASS_NAMES.BASE);
    }

    return { animate, reset, cleanup };
}