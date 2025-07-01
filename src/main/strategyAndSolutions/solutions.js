import { isTouchscreen } from '../../common/helpers';
import { getIntersectionObserver } from '../../common/helpers';

import './style.scss';

export const useSolutions = () => {
    const solutions = document.querySelector('.solutions');
    const cards = solutions.querySelectorAll('.solutions__card');

    if (isTouchscreen) {
        return useMobileSolutions(cards);
    } else {
        return useDesktopSolutions(cards);
    }
};

function useDesktopSolutions(cards) {
    const cleanups = [...cards].map((card) => {
        const tooltip = card.querySelector('.solutions__card__tooltip');
        const tooltipButton = tooltip.querySelector('.tooltip-btn');
        const target = { x: 0, y: 0 };
        const current = { x: 0, y: 0 };
        const size = { width: 0, height: 0 };
        const MOVEMENT = 1;

        const resizeObserver = new ResizeObserver(([entry]) => {
            size.width = entry.contentRect.width;
            size.height = entry.contentRect.height;
        });
        resizeObserver.observe(card);

        const lerp = gsap.utils.interpolate;
        gsap.ticker.add(onTick);

        card.addEventListener('mouseenter', onMouseEnter);

        return () => {
            resizeObserver.disconnect();
            gsap.ticker.remove(onTick);
            card.removeEventListener('mouseenter', onMouseEnter);
            card.removeEventListener('mousemove', onMouseMove);
            card.removeEventListener('mouseleave', onMouseLeave);
        }

        function onTick() {
            current.x = lerp(current.x, target.x, 0.05);
            current.y = lerp(current.y, target.y, 0.05);

            const moveX = current.x * MOVEMENT;
            const moveY = current.y * MOVEMENT;

            moveTooltip(moveX, moveY);
        }

        function onMouseEnter(event) {
            setTooltipPosition(event.offsetX, event.offsetY);
            card.classList.add('active');
            card.addEventListener('mousemove', onMouseMove);
            card.addEventListener('mouseleave', onMouseLeave);
        }

        function onMouseLeave(event) {
            card.classList.remove('active');
            card.removeEventListener('mousemove', onMouseMove);
            card.removeEventListener('mouseleave', onMouseLeave);
        }

        function onMouseMove(event) {
            target.x = event.offsetX;
            target.y = event.offsetY;
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
            const buttonShiftX = x / size.width * 100;
            const buttonShiftY = y / size.height * 100;

            gsap.set(tooltipButton, { transform: `translate3d(-${buttonShiftX}%, -${buttonShiftY}%, 0)` });
            gsap.set(tooltip, { x, y });
        }
    });

    return () => cleanups.forEach((cleanup) => cleanup());
}

function useMobileSolutions(cards) {
    const observer = getIntersectionObserver(49, (entry) => {
        entry.target.classList.add('active');
    }, (entry) => {
        entry.target.classList.remove('active');
    });

    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
}
