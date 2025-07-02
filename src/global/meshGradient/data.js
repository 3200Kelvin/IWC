export const meshData = {
    colors: {
        tl: '#1f4287',
        tr: '#4c68a9',
        bl: '#0c2b62',
        br: '#7c89cd'
    },
    canvasId: 'mesh-canvas',
    dots: [
        [-1, -1],
        [-1, 1],
        [0.3, -0.4],
        [1, 1]
    ],
    moving: [
        { index: 2, revert: false },
        // { index: 3, revert: true, coeff: 0.4, add: { vert: 0.5, hor: 0.5 } },
    ],
    target: [
        [-1, 0.5],
    ]
};