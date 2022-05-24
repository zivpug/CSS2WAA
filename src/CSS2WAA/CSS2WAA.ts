import {toJSON} from 'cssjson';

type JSONKeyframes = {
    [key: string]: {
        children: any;
        attributes: any;
    };
};

const missingSemicolon = /(?<!})(?<!;)}/gm;
const chainedPercentages = /((([0-9]+)%),((?:\s*){1,3}))+(([0-9]+)%)((?:\s*){1,3})({([^}]*)})/gm;
const findPercentage = /(\d+(\.\d+)?%)/gm;
const findKeyframe = /({[\s\S]*})/gm;
const findFrom = /(.)(from)(,|{|\s|{)(.*)/gm;
const findTo = /(.)(to)(,|{|\s|{)(.*)/gm;
const multiSpaces = /\s\s+/g;
const multiSemicolons = /;[\s]+;/g;

export const css2waa = (animation: string): Keyframe[] => {
    /**
     fixes CSS keyframes support for CSSJSON
     **/
    animation = fixMissingLastSemicolon(animation);
    animation = fixChainedPercentage(animation);
    animation = fixTransformOrigin(animation);

    /**
     Convert to JSON object using CSSJSON.toJSON()
     **/
    let animationObj = toJSON(animation).children;

    /**
     Create WAA animation from the JSON object
     **/
    return Object.keys(animationObj)
        .map((key) => buildWaaObjects(animationObj[key].children))
        .flat();
};

export const buildWaaObjects = (obj: JSONKeyframes): Keyframe[] => {
    return Object.keys(obj)
        .filter((key) => Object.keys(obj[key]).length > 0)
        .map((key) => ({
            [key]: obj[key].attributes,
        }))
        .map((frame) =>
            Object.keys(frame).map((key) => ({
                offset: convertPercentagesToDecimal(key),
                ...frame[key],
            })),
        )
        .flat()
        .sort((prev, next) => prev.offset - next.offset);
};

/**
 Chained percentages -> 10%, 100% { ... }
 has to be broken into separate declarations
 10% { ... }
 100% { ... }
 **/
export const fixChainedPercentage = (string: string): string => {
    string = stringFixes(string);
    let match = string.match(chainedPercentages);

    if (match) {
        match.forEach((str: string) => {
            string = string.replace(str, separateValues(str));
        })
    }

    return string;
};

const separateValues = (string: string): string => {
    const keyframe = string.match(findKeyframe);
    const percentages = string.match(findPercentage)
    if (percentages) {
        return percentages.reduce((newStr: string, str: string) => {
            return `${newStr} ${str} ${keyframe}`;
        }, '')
    }
    return string;
}

export const stringFixes = (string: string): string => {
    return string.replace(findFrom, '$1 0% $3 $4')
        .replace(findTo, '$1 100% $3 $4')
        .replace(/% ,/gm, '%, ')
        .replace(multiSpaces, ' ')
        .replace(multiSemicolons, ';')
        .replace(/animation-timing-function/gm, 'easing');
}

export const fixMissingLastSemicolon = (string: string): string => {
    return string.replace(missingSemicolon, ';}');
};

export const fixTransformOrigin = (animation: string): string => {
    return animation.replace(/transform-origin:/gi, 'transformOrigin:');
};

export const convertPercentagesToDecimal = (string: string): number => {
    if (string === "from" || string === "to") {
        return string === "from" ? 0 : 1;
    }
    return string.includes('%') ? parseFloat(string) / 100 : 0;
};
