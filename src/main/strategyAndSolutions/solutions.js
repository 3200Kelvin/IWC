import { isTouchscreen } from '../../common/helpers';
import { getIntersectionObserver } from '../../common/helpers';

import './style.scss';

export const useSolutions = () => {
    const solutions = document.querySelector('.solutions');
    if (!solutions) {
        return;
    }

    const cards = solutions.querySelectorAll('.solutions__card');

    if (isTouchscreen) {
        return useMobileSolutions(cards);
    } else {
        return useDesktopSolutions(solutions, cards);
    }
};

function useDesktopSolutions(solutions, cards) {
    const tooltip = document.querySelector('.solutions__tip');
    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    const MOVEMENT = 1;

    const cleanups = [...cards].map((card) => {
        card.addEventListener('mouseenter', onMouseEnter);

        return () => {
            card.removeEventListener('mouseenter', onMouseEnter);
            card.removeEventListener('mouseleave', onMouseLeave);
        }

        function onMouseEnter(event) {
            tooltip.classList.add('shown');
            card.classList.add('active');
            card.addEventListener('mouseleave', onMouseLeave);
        }

        function onMouseLeave(event) {
            tooltip.classList.remove('shown');
            card.classList.remove('active');
            card.removeEventListener('mouseleave', onMouseLeave);
        }
    });

    const lerp = gsap.utils.interpolate;
    gsap.ticker.add(onTick);

    solutions.addEventListener('mouseenter', onMouseEnter);

    return () => {
        gsap.ticker.remove(onTick);
        solutions.removeEventListener('mouseenter', onMouseEnter);
        solutions.removeEventListener('mousemove', onMouseMove);
        solutions.removeEventListener('mouseleave', onMouseLeave);
        cleanups.forEach((cleanup) => cleanup());
    }

    function onTick() {
        current.x = lerp(current.x, target.x, 0.05);
        current.y = lerp(current.y, target.y, 0.05);

        const moveX = current.x * MOVEMENT;
        const moveY = current.y * MOVEMENT;

        moveTooltip(moveX, moveY);
    }

    function onMouseMove(event) {
        target.x = event.clientX;
        target.y = event.clientY;
    }

    function onMouseEnter(event) {
        setTooltipPosition(event.clientX, event.clientY);
        solutions.addEventListener('mousemove', onMouseMove);
        solutions.addEventListener('mouseleave', onMouseLeave);
    }

    function onMouseLeave(event) {
        solutions.removeEventListener('mousemove', onMouseMove);
    }

    function setTooltipPosition(x, y) {
        target.x = x;
        target.y = y;
        current.x = x;
        current.y = y;

        const moveX = current.x * MOVEMENT; // adjust multiplier for intensity
        const moveY = current.y * MOVEMENT;

        moveTooltip(moveX, moveY);
    }

    function moveTooltip(x, y) {
        gsap.set(tooltip, { x, y });
    }
}

function useMobileSolutions(cards) {
    const observer = getIntersectionObserver(25, (entry) => {
        entry.target.classList.add('active');
    }, (entry) => {
        entry.target.classList.remove('active');
    });

    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
}
