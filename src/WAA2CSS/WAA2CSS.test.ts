import {waa2css, parseKeyframe, fixPropertiesForCss} from "./WAA2CSS";
import * as vars from "./testVars";

test("should return a string with valid CSS animation", () => {
    const re = waa2css(vars.testWaaAnimation);
    expect(re).toBe(vars.returnedTestCss);
})

test("should change transformOrigin into transform-origin", () => {
    const re = fixPropertiesForCss('transformOrigin');
    expect(re).toBe("transform-origin");

    const re2 = fixPropertiesForCss('transform');
    expect(re2).toBe("transform");

    const re3 = fixPropertiesForCss("easing");
    expect(re3).toBe("animation-timing-function");
})

test("should return string from keyframe object", () => {
    const re = parseKeyframe(vars.testKeyframe);
    expect(re).toBe(" transform: translateY(0); transform-origin: top left; opacity: 1; animation-timing-function: ease-out;");
})
