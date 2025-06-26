// import { getIsMobile } from "../helpers";

// export const setTextBlur = (element, isPaused = true) => {
//     const split = SplitText.create(element, {
//         type: "lines, words",
//     });

//     const isMobile = getIsMobile();

//     split.lines.forEach((line) => {
//         if (!line.innerHTML) {
//             line.style.setProperty('height', '1em');
//         }
//     });

//     gsap.to(split.words, {
//         transform: 'scale(0.95)',
//         opacity: 0,
//         filter: isMobile ? 'none' : 'blur(10px)',
//     });
//     gsap.to(element, { pointerEvents: 'none' });

//     const timeline = gsap.timeline()
//         .to(element, { pointerEvents: 'auto' })
//         .to(split.words, {
//             willChange: 'opacity, filter',
//         })
//         .to(split.words, {
//             transform: 'scale(1)',
//             opacity: 1,
//             filter: isMobile ? 'none' : 'blur(0px)',
//             duration: 1,
//             stagger: 0.005,
//         })
//         .to(split.words, {
//             willChange: 'none',
//         });

//     if (isPaused) {
//         timeline.pause();
//     }

//     return timeline;
// }
