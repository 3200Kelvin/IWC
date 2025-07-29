import { useTestimonialsDesktop } from './desktop';
import { useTestimonialsMobile } from './mobile';
import { getIsDesktop } from '../../common/helpers';

export const useTestimonials = () => {
    const block = document.querySelector('.testimonials');

    if (!block) {
        return;
    }
    
    const entries = block.querySelectorAll('.testimonials__entry');
    let cleanup;

    onResize();
    window.addEventListener('resize', onResize, { passive: true });

    return () => {
        cleanup?.();
        window.removeEventListener('resize', onResize);
    }

    function onResize() {
        cleanup?.();
        cleanup = init();
    }

    function init() {
        if (getIsDesktop()) {
            return useTestimonialsDesktop(block, entries);
        } else {
            return useTestimonialsMobile(block, entries);
        }
    }

};