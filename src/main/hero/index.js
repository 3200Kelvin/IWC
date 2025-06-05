import { isLoaded } from "../../initial";
import { PRELOADER_REMOVED_EVENT_NAME } from "../../global/preloader";

export const useHeroAnimation = () => {
    if (isLoaded()) {
        return;
    }

    const hero = document.querySelector('.hero');
    if (!hero) {
        return;
    }

    const menuBtn = document.querySelector('.menu-btn');
    const logo = document.querySelector('.fixed__logo');
    const shadow = hero.querySelector('.fixed-element--hero');
    const heading = hero.querySelector('h1');
    const tagline = hero.querySelector('.hero__tagline');
    const tip = hero.querySelector('.hero__tip');

    gsap.timeline()
        .to(logo, { transform: 'translateY(-150%)' })
        .to(shadow, { transform: 'translateY(-50%)', opacity: 0, filter: 'blur(5px)' })
        .to([heading, tagline, tip, menuBtn], { opacity: 0, pointerEvents: 'none' });

    document.addEventListener(PRELOADER_REMOVED_EVENT_NAME, animate);

    function animate() {
        gsap.timeline()
            .add('logo')
            .to(logo, { transform: 'translateY(0%)', duration: 1.6 }, 'logo')
            .to(shadow, { transform: 'translateY(0%)', opacity: 1, filter: 'blur(0px)', duration: 1.6 }, 'logo')
            .to([heading, tagline, tip, menuBtn], { opacity: 1, pointerEvents: 'auto', duration: 1, stagger: 0.2 });
    }
}