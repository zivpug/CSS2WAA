export const testWaaAnimation = [
    {
        offset: 0,
        transform: 'translateY(-500px) rotate(-90deg)',
        'easing': 'ease-in',
        opacity: '0',
    },
    {
        offset: 0.38,
        transform: 'translateY(0)',
        'easing': 'ease-out',
        opacity: '1',
    },
    {
        offset: 0.55,
        transform: 'translateY(-65px)',
        'easing': 'ease-in',
    },
    {
        offset: 0.72,
        transform: 'translateY(0) rotate(0deg)',
        'easing': 'ease-out',
    },
    {
        offset: 0.81,
        transform: 'translateY(-28px)',
        'easing': 'ease-in',
    },
    {
        offset: 0.9,
        transform: 'translateY(0)',
        'easing': 'ease-out',
    },
    {
        offset: 0.95,
        transform: 'translateY(-8px)',
        'easing': 'ease-in',
    },
    {
        offset: 1,
        transform: 'translateY(0)  rotate(90deg)',
        'easing': 'ease-out',
    },
];

export const returnedTestCss = ` 0% { transform: translateY(-500px) rotate(-90deg); animation-timing-function: ease-in; opacity: 0;}
 38% { transform: translateY(0); animation-timing-function: ease-out; opacity: 1;}
 55% { transform: translateY(-65px); animation-timing-function: ease-in;}
 72% { transform: translateY(0) rotate(0deg); animation-timing-function: ease-out;}
 81% { transform: translateY(-28px); animation-timing-function: ease-in;}
 90% { transform: translateY(0); animation-timing-function: ease-out;}
 95% { transform: translateY(-8px); animation-timing-function: ease-in;}
 100% { transform: translateY(0)  rotate(90deg); animation-timing-function: ease-out;}
`;

export const testKeyframe = {
    "transform": "translateY(0)",
    "transformOrigin": "top left",
    "opacity": "1",
    "easing": "ease-out"
}
