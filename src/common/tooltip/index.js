import './style.scss';

export const useTooltip = (tooltip, block, elements) => {
    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    const MOVEMENT = 1;

    const lerp = gsap.utils.interpolate;
    gsap.ticker.add(onTick);

    tooltip.classList.add('moving-tooltip');

    const cleanups = [...elements].map((element) => {
        element.addEventListener('mouseenter', onMouseEnter);

        return () => {
            element.removeEventListener('mouseenter', onMouseEnter);
            element.removeEventListener('mouseleave', onMouseLeave);
        }

        function onMouseEnter() {
            tooltip.classList.add('shown');
            element.addEventListener('mouseleave', onMouseLeave);
        }

        function onMouseLeave() {
            tooltip.classList.remove('shown');
            element.removeEventListener('mouseleave', onMouseLeave);
        }
    });
    
    block.addEventListener('mouseenter', onMouseEnter);

    return () => {
        gsap.ticker.remove(onTick);
        block.removeEventListener('mouseenter', onMouseEnter);
        block.removeEventListener('mousemove', onMouseMove);
        block.removeEventListener('mouseleave', onMouseLeave);
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
        block.addEventListener('mousemove', onMouseMove);
        block.addEventListener('mouseleave', onMouseLeave);
    }

    function onMouseLeave(event) {
        block.removeEventListener('mousemove', onMouseMove);
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
};
