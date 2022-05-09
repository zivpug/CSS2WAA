type WebAnimationAPIArgs = [Keyframe[], PropertyIndexedKeyframes];


export const getKeyframesFromWAA = (
    animation: WebAnimationAPIArgs
): string => animation[0].reduce((keyframes: string, keyframe) => {
    const cssKeyframe: any = {...keyframe};
    if (cssKeyframe.offset) {
        const percent = `${Math.round(cssKeyframe.offset * 100)}%`;
        return `${keyframes} ${percent} {${parseKeyframe(cssKeyframe)}}\n`;
    }
    return `${keyframes}`;
}, '');

export const parseKeyframe = (keyframe: {[key: string]: string}): string => {
    return Object.keys(keyframe).reduce((str: string, key: string) => {
        return `${str} ${fixTransformOriginToCss(key)}: ${keyframe[key]};`
    }, '')
}

export const fixTransformOriginToCss = (key: string): string => {
    return key.replace(/transformOrigin/, 'transform-origin');
};

