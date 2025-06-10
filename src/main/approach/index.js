import { setTextBlur } from "../../common/textBlur";
import { getIsMobile } from "../../common/helpers";

const SHADOW_BLUR = '12px';
const DEFAULT_DURATION = 1.4;
const SHADOW_INITIAL_TRANSLATE = {
    DESKTOP: '-5%',
    MOBILE: '-45%',
};

export const useApproachAnimation = () => {
    const block = document.querySelector('.approach');
    if (!block) {
        return;
    }

    const counter = block.querySelector('.approach__counter');
    const counterText = counter.querySelector('.approach__counter__number p');
    const lineFill = counter.querySelector('.approach__counter__line__fill');
    const texts = block.querySelectorAll('.approach__text__entry p');
    const steps = block.querySelectorAll('.approach__step');
    const total = steps.length;

    const fixedElement = block.querySelector('.fixed-element');
    const shadow = fixedElement.querySelector('.fixed-shadow');
    const ovalTop = fixedElement.querySelector('.approach__oval--top');
    const ovalBottom = fixedElement.querySelector('.approach__oval--bottom');
    const circlesContainer = fixedElement.querySelector('.approach__circles');
    const circles = circlesContainer.querySelectorAll('.approach__circle');

    let current = null;
    changeCounter(current);

    steps.forEach((step, index) => {
        const text = texts[index];
        const textAnimation = setTextBlur(text);

        const showText = () => {
            gsap.to(text, { opacity: 1 });
            textAnimation.restart();
        }

        const hideText = () => {
            gsap.to(text, { opacity: 0, duration: 0.4 })
                .then(() => textAnimation.revert());
        }

        ScrollTrigger.create({
            // markers: true,
            trigger: step,
            start: "top 25%",
            end: "bottom 25%",
            scrub: true,
            onToggle: (self) => {
                if (self.isActive) {
                    showText();
                    setActive(index);
                } else {
                    hideText();
                    if (index === 0 && self.direction === -1 || index === total - 1 && self.direction === 1) {
                        setActive(null, index === 0);
                    }
                }
            },
        });
    });

    function setActive(newIndex, isPre = false) {
        if (newIndex === current) {
            return;
        }

        changeCounter(newIndex);

        switch(newIndex) {
            case null:
                if (isPre) {
                    stepPre();
                }
                break;
            case 0:
                step0();
                break;
            case 1:
                step1();
                break;
            case 2:
                step2();
                break;
        }

        current = newIndex;
    }

    function changeCounter(newIndex) {
        if (newIndex === null) {
            gsap.to(counter, { opacity: 0, duration: DEFAULT_DURATION });
            return;
        }

        if (current === null) {
            gsap.to(counter, { opacity: 1, duration: DEFAULT_DURATION });
        }

        counterText.innerText = `${newIndex + 1}/${total}`;
        gsap.to(lineFill, { transform: `scaleX(${(newIndex + 1) / total})`, duration: DEFAULT_DURATION });
    }

    function stepPre() {
        gsap.to(ovalTop, { opacity: 1, duration: DEFAULT_DURATION });
    }

    function step0() {
        gsap.to([ovalTop, ovalBottom], { opacity: 0, duration: DEFAULT_DURATION });
        gsap.to(fixedElement, { transform: 'scale(1)', duration: DEFAULT_DURATION });
    }

    function step1() {
        const shadowTranslate = getIsMobile() ? SHADOW_INITIAL_TRANSLATE.MOBILE : SHADOW_INITIAL_TRANSLATE.DESKTOP;
        gsap.to(ovalTop, { opacity: 1, duration: DEFAULT_DURATION });
        gsap.to(ovalBottom, { opacity: 1, duration: DEFAULT_DURATION });
        gsap.to(fixedElement, { transform: 'scale(0.9)', duration: DEFAULT_DURATION });
        gsap.to(shadow, { transform: `scale(1) translateX(${shadowTranslate})`, filter: `blur(${SHADOW_BLUR})`, duration: DEFAULT_DURATION });
        gsap.timeline()
            .to(circlesContainer, { opacity: 0, duration: DEFAULT_DURATION / 4 })
            .to(circles, { transform: 'scale(0.8)' });
    }

    function step2() {
        gsap.to([ovalTop, ovalBottom], { opacity: 0, duration: DEFAULT_DURATION });
        gsap.to(fixedElement, { transform: 'scale(1) translateX(calc(50vw - 50%))', duration: DEFAULT_DURATION });
        gsap.to(shadow, { transform: 'scale(0.25) translateX(0%)', filter: 'blur(2px)', duration: DEFAULT_DURATION });
        gsap.to(circlesContainer, { opacity: 1, duration: DEFAULT_DURATION / 4 });
        gsap.to(circles, { transform: 'scale(1)', duration: DEFAULT_DURATION / 4, stagger: 0.1 });
    }
}