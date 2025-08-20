import './style.scss';

export const usePastEventsSlides = (block) => {
    const slides = block.querySelectorAll('.past-events__event');
    const [prevbtn, nextBtn] = block.querySelectorAll('.arrow-button');

    let current = 0;
    slides[0].classList.add('active');

    prevbtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);

    return () => {
        prevbtn.removeEventListener('click', prevSlide);
        nextBtn.removeEventListener('click', nextSlide);
    };

    function nextSlide() {
        const newIndex = (current + 1) % slides.length;
        setNewSlide(newIndex);
    }

    function prevSlide() {
        const newIndex = (current - 1 + slides.length) % slides.length;
        setNewSlide(newIndex);
    }

    function setNewSlide(newIndex) {
        slides[current].classList.remove('active');
        slides[newIndex].classList.add('active');
        current = newIndex;
    }
};