export const useHeroAnimation = () => {
    const hero = document.querySelector('.hero');
    if (!hero) {
        return;
    }

    const logo = document.querySelector('.fixed__logo');
    const shadow = hero.querySelector('.fixed-element--hero');
    const heading = hero.querySelector('h1');
    const tagline = hero.querySelector('.hero__tagline');
    const tip = hero.querySelector('.hero__tip');
}