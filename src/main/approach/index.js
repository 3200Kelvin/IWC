import { setTextBlur } from "../../common/textBlur";
import { getCleanup, getScrollTriggerRefresh } from "../../common/helpers";
import { isNoAnimations } from "../../common/performance";

import './style.scss';

export const useApproachAnimation = () => {
    const block = document.querySelector('.approach');

    if (!block) {
        return;
    }

    if (isNoAnimations()) {
        return;
    }

    const classes = block.className;
    const STEPS_CLASS_NAMES = ['step-0', 'step-1', 'step-2'];

    const counter = block.querySelector('.approach__counter');
    const counterText = counter.querySelector('.approach__counter__number p');
    const lineFill = counter.querySelector('.approach__counter__line__fill');
    const texts = block.querySelectorAll('.approach__text__entry p');
    const steps = block.querySelectorAll('.approach__step');
    const total = steps.length;

    let current = null;
    changeCounter(current);

    const cleanups = [...steps].map(initStep);

    return getCleanup(...cleanups);

    function initStep(step, index) {
        const text = texts[index];
        
        const { animate, reset, cleanup } = setTextBlur(text);

        const showText = () => {
            gsap.to(text, { opacity: 1 });
            animate();
        }

        const hideText = () => {
            gsap.to(text, { opacity: 0, duration: 0.4 })
                .then(reset);
        }

        const scrollTrigger = ScrollTrigger.create({
            trigger: step,
            start: "top 25%",
            end: "bottom 25%",
            scrub: true,
            onToggle: (self) => {
                if (self.isActive) {
                    showText?.();
                    setActive(index);
                } else {
                    hideText?.();
                    if (index === 0 && self.direction === -1 || index === total - 1 && self.direction === 1) {
                        setActive(null, index === 0);
                    }
                }
            },
        });

        const triggerRefreshCleanup = getScrollTriggerRefresh(block, scrollTrigger);

        return () => {
            scrollTrigger.kill();
            cleanup?.();
            triggerRefreshCleanup?.();
        }
    };

    function setActive(newIndex, isPre = false) {
        if (newIndex === current) {
            return;
        }

        changeCounter(newIndex);
        setClassNames(newIndex, isPre);

        current = newIndex;
    }

    function setClassNames(newIndex = null, isPre = false) {
        if (newIndex === null && !isPre) {
            return;
        }
        const newName = newIndex === null ? null : `animated ${STEPS_CLASS_NAMES[newIndex]}`;
        block.className = newName ? `${classes} ${newName}` : classes;
    }

    function changeCounter(newIndex) {
        if (newIndex === null) {
            lineFill.style.setProperty('transform', 'scaleX(0)');
            counter.style.setProperty('opacity', 0);
            return;
        }

        if (current === null) {
            counter.style.setProperty('opacity', 1);
        }

        counterText.innerText = `${newIndex + 1}/${total}`;
        lineFill.style.setProperty('transform', `scaleX(${(newIndex + 1) / total})`);
    }
}