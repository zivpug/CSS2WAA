import { toJSON } from 'cssjson';

type JSONKeyframes = {
  [key: string]: {
    children: any;
    attributes: any;
  };
};

const missingSemicolon = /(?<!})(?<!;)}/gm;
const chainedPercentages = /(((([0-9]+)%)),((?:\s*){1,3}))(([0-9]+)%)((?:\s*){1,3})({([^}]*)})/gm;
const chainedReplacer = `$2 $9 $6 $9`;

export const css2waa = (animation: string): Keyframe[] => {
  /**
     String fixes required for toJSON
     **/
  animation = fixMissingLastSemicolon(animation);
  animation = fixChainedPercentage(animation);
  animation = fixTransformOrigin(animation);

  /**
     Convert to JSON object
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
  let match = string.match(chainedPercentages);
  while (match) {
    string = string.replace(chainedPercentages, chainedReplacer);
    match = string.match(chainedPercentages);
  }
  return string;
};

export const fixMissingLastSemicolon = (string: string): string => {
  return string.replace(missingSemicolon, ';}');
};

export const fixTransformOrigin = (animation: string): string => {
  return animation.replace(/transform-origin:/gi, 'transformOrigin:');
};

export const convertPercentagesToDecimal = (string: string): number => {
  return string.includes('%') ? parseFloat(string) / 100 : 0;
};
