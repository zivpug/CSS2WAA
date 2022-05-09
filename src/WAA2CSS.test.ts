import {fixTransformOriginToCss, getKeyframesFromWAA, parseKeyframe} from "./WAA2CSS";

const testWaaAnimation = [
    {
        offset: 0,
        transform: 'translateY(-500px)',
        'animation-timing-function': 'ease-in',
        opacity: '0',
    },
    {
        offset: 0.38,
        transform: 'translateY(0)',
        'animation-timing-function': 'ease-out',
        opacity: '1',
    },
    {
        offset: 0.55,
        transform: 'translateY(-65px)',
        'animation-timing-function': 'ease-in',
    },
    {
        offset: 0.72,
        transform: 'translateY(0)',
        'animation-timing-function': 'ease-out',
    },
    {
        offset: 0.81,
        transform: 'translateY(-28px)',
        'animation-timing-function': 'ease-in',
    },
    {
        offset: 0.9,
        transform: 'translateY(0)',
        'animation-timing-function': 'ease-out',
    },
    {
        offset: 0.95,
        transform: 'translateY(-8px)',
        'animation-timing-function': 'ease-in',
    },
    {
        offset: 1,
        transform: 'translateY(0)',
        'animation-timing-function': 'ease-out',
    },
];

const returnedTestCss = ' 38% { offset: 0.38; transform: translateY(0); animation-timing-function: ease-out; opacity: 1;}\n' +
    ' 55% { offset: 0.55; transform: translateY(-65px); animation-timing-function: ease-in;}\n' +
    ' 72% { offset: 0.72; transform: translateY(0); animation-timing-function: ease-out;}\n' +
    ' 81% { offset: 0.81; transform: translateY(-28px); animation-timing-function: ease-in;}\n' +
    ' 90% { offset: 0.9; transform: translateY(0); animation-timing-function: ease-out;}\n' +
    ' 95% { offset: 0.95; transform: translateY(-8px); animation-timing-function: ease-in;}\n' +
    ' 100% { offset: 1; transform: translateY(0); animation-timing-function: ease-out;}\n';



const testKeyframe = {
    "transform": "translateY(0)",
    "transformOrigin": "top left",
    "opacity": "1",
    "easing": "ease-out"
}

test("should return a string with valid CSS animation", () => {
    const re = getKeyframesFromWAA([testWaaAnimation, {}]);
    expect(re).toBe(returnedTestCss);
})


test("should change transformOrigin into transform-origin", () => {
    const re = fixTransformOriginToCss('transformOrigin');
    expect(re).toBe("transform-origin");

    const re2 = fixTransformOriginToCss('transform');
    expect(re2).toBe("transform");
})

test("should return string from keyframe object", () => {
    const re = parseKeyframe(testKeyframe);
    expect(re).toBe(" transform: translateY(0); transform-origin: top left; opacity: 1; easing: ease-out;");
})
