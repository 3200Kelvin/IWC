import { isTouchscreen } from "../../common/helpers";

export const useBgParallax = () => {
    if (isTouchscreen) {
        return;
    }

    const bg = document.querySelector('.page-bg__image--gradient');
    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    const MOVEMENT = 0.1;

    gsap.set(bg, { transform: 'scale(1.1)' });

    window.addEventListener("mousemove", parallax);

    const lerp = gsap.utils.interpolate; // or gsap.utils.lerp

    gsap.ticker.add(() => {
        current.x = lerp(current.x, target.x, 0.05);
        current.y = lerp(current.y, target.y, 0.05);

        const moveX = current.x * MOVEMENT; // adjust multiplier for intensity
        const moveY = current.y * MOVEMENT;

        gsap.set(bg, {
            x: moveX,
            y: moveY,
        });
    });

    return () => window.removeEventListener("mousemove", parallax);

    function parallax(event) {
        const { clientX, clientY } = event;
        const { innerWidth, innerHeight } = window;

        target.x = clientX - innerWidth / 2;
        target.y = clientY - innerHeight / 2;
    }
};
