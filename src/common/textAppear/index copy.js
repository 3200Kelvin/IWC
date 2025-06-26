// export const setTextAppear = (element, { isPaused = true, timeline = gsap.timeline() } = {}) => {
//     const split = SplitText.create(element, {
//         type: 'lines',
//         mask: 'lines',
//         linesClass: 'text-appear-line',
//     });

//     split.lines.forEach((line) => {
//         if (!line.innerHTML) {
//             line.style.setProperty('height', '1em');
//         }
//     });

//     gsap.to(split.lines, {
//         transform: 'translateY(120%) rotateZ(1deg)',
//     });
//     gsap.to(element, { pointerEvents: 'none' });

//     timeline
//         .to(element, { pointerEvents: 'auto' })
//         .to(split.lines, {
//             willChange: 'transform',
//         })
//         .to(split.lines, {
//             transform: 'translateY(0%) rotateZ(0deg)',
//             duration: 1,
//             stagger: 0.15,
//         })
//         .to(split.lines, {
//             willChange: 'none',
//         });

//     if (isPaused) {
//         timeline.pause();
//     }

//     return timeline;
// }

