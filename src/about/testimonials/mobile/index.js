import './style.scss';

export const useTestimonialsMobile = (block, entries) => {
    const buttons = {
        prev: block.querySelector('.testimonials__button--prev'),
        next: block.querySelector('.testimonials__button--next')
    };
    const BASE_CLASS = 'testimonials__entry';

    let current = 0;

    buttons.prev.addEventListener('click', showPrev);
    buttons.next.addEventListener('click', showNext);

    toggleButtons();

    return () => {
        buttons.prev.removeEventListener('click', showPrev);
        buttons.next.removeEventListener('click', showNext);
        current = 0;
        toggleButtons();
        shiftCards();
    };

    function toggleButtons() {
        buttons.prev.classList.toggle('testimonials__button--hidden', current === 0);
        buttons.next.classList.toggle('testimonials__button--hidden', current === entries.length - 1);
    }

    function shiftCards() {
        entries.forEach((entry, index) => {
            const classNameIndex = Math.max(index + 1 - current, 0);
            const classList = `${BASE_CLASS} ${BASE_CLASS}--${classNameIndex}`;

            entry.classList = classList;
        });
    }

    function showNext() {
        current += 1;

        shiftCards();
        toggleButtons();
    }

    function showPrev() {
        current -= 1;

        shiftCards();
        toggleButtons();
    }
};

// export const useTestimonialsMobile = (block, entries) => {
//     const buttons = {
//         prev: block.querySelector('.testimonials__button--prev'),
//         next: block.querySelector('.testimonials__button--next')
//     };
//     const CN = {
//         HIDDEN: 'testimonials__entry--hidden',
//         NEXT: 'testimonials__entry--next',
//     };

//     let current = 0;

//     buttons.prev.addEventListener('click', showPrev);
//     buttons.next.addEventListener('click', showNext);

//     toggleButtons();

//     return () => {
//         buttons.prev.removeEventListener('click', showPrev);
//         buttons.next.removeEventListener('click', showNext);
//         current = 0;
//         toggleButtons();
//         shiftCards();
//     };

//     function toggleButtons() {
//         buttons.prev.classList.toggle('testimonials__button--hidden', current === 0);
//         buttons.next.classList.toggle('testimonials__button--hidden', current === entries.length - 1);
//     }

//     function shiftCards() {
//         entries.forEach((entry, index) => {
//             if (index < current) {
//                 entry.classList.add(CN.HIDDEN);
//             } else {
//                 entry.classList.remove(CN.HIDDEN);
//             }

//             if (index > current) {
//                 entry.classList.add(CN.NEXT);
//             } else {
//                 entry.classList.remove(CN.NEXT);
//             }
//         });
//     }

//     function showNext() {
//         current += 1;

//         shiftCards();
//         toggleButtons();
//     }

//     function showPrev() {
//         current -= 1;

//         shiftCards();
//         toggleButtons();
//     }
// };
