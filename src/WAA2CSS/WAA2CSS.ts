
export const waa2css = (
    animation: Keyframe[]
): string => animation.reduce((keyframes: string, keyframe) => {
    const cssKeyframe: any = {...keyframe};
    if (cssKeyframe.offset || cssKeyframe.offset === 0) {
        const percent = `${Math.round(cssKeyframe.offset * 100)}%`;
        delete cssKeyframe.offset;
        return `${keyframes} ${percent} {${parseKeyframe(cssKeyframe)}}\n`;
    }
    return `${keyframes}`;
}, '');

export const parseKeyframe = (keyframe: {[key: string]: string}): string => {
    return Object.keys(keyframe).reduce((str: string, key: string) => {
        return `${str} ${fixPropertiesForCss(key)}: ${keyframe[key]};`
    }, '')
}

export const fixPropertiesForCss = (key: string): string => {
    key = key.replace(/transformOrigin/, 'transform-origin');
    key = key.replace('easing', 'animation-timing-function');
    return key;
};

