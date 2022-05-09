import {
  buildWaaObjects,
  fixTransformOrigin,
  fixChainedPercentage,
  fixMissingLastSemicolon,
  convertPercentagesToDecimal,
  css2waa,
} from './CSS2WAA';

const testAnimationBounce =
  'keyframes bounce-in-top{0%{transform:translateY(-500px);animation-timing-function:ease-in;opacity:0}38%{transform:translateY(0);animation-timing-function:ease-out;opacity:1}55%{transform:translateY(-65px);animation-timing-function:ease-in}72%{transform:translateY(0);animation-timing-function:ease-out}81%{transform:translateY(-28px);animation-timing-function:ease-in}90%{transform:translateY(0);animation-timing-function:ease-out}95%{transform:translateY(-8px);animation-timing-function:ease-in}100%{transform:translateY(0);animation-timing-function:ease-out}}';

const testAnimationTransformOrigin =
  'keyframes slide-in-elliptic-top-fwd{0%{transform:translateY(-600px) rotateX(-30deg) scale(0);transform-origin:50% 100%;opacity:0}100%{transform:translateY(0) rotateX(0) scale(1);transform-origin:50% 1400px;opacity:1}}';

const testAnimationWobble =
  '@keyframes wobble-ver-left {0%,100% { transform: translateY(0) rotate(0); transform-origin: 50% 50%;}15% { transform: translateY(-30px) rotate(-6deg);}30% { transform: translateY(15px) rotate(6deg);}45% { transform: translateY(-15px) rotate(-3.6deg);}60% { transform: translateY(9px) rotate(2.4deg);}75% { transform: translateY(-6px) rotate(-1.2deg);}}';

test('returns correct WAA object', () => {
  const returnTestAnimation = [
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
  const returnAnimationTransformOrigin = [
    {
      offset: 0,
      transform: 'translateY(-600px) rotateX(-30deg) scale(0)',
      opacity: '0',
      transformOrigin: '50% 100%',
    },
    {
      offset: 1,
      transform: 'translateY(0) rotateX(0) scale(1)',
      opacity: '1',
      transformOrigin: '50% 1400px',
    },
  ];
  const returnAnimationWobble = [
    {
      offset: 0,
      transform: 'translateY(0) rotate(0)',
      transformOrigin: '50% 50%',
    },
    {
      offset: 0.15,
      transform: 'translateY(-30px) rotate(-6deg)',
    },
    {
      offset: 0.3,
      transform: 'translateY(15px) rotate(6deg)',
    },
    {
      offset: 0.45,
      transform: 'translateY(-15px) rotate(-3.6deg)',
    },
    {
      offset: 0.6,
      transform: 'translateY(9px) rotate(2.4deg)',
    },
    {
      offset: 0.75,
      transform: 'translateY(-6px) rotate(-1.2deg)',
    },
    {
      offset: 1,
      transform: 'translateY(0) rotate(0)',
      transformOrigin: '50% 50%',
    },
  ];

  const re = css2waa(testAnimationWobble);
  expect(re).toEqual(returnAnimationWobble);

  const re1 = css2waa(testAnimationBounce);
  expect(re1).toEqual(returnTestAnimation);

  const re2 = css2waa(testAnimationTransformOrigin);
  expect(re2).toEqual(returnAnimationTransformOrigin);
});

test('will add missing semicolons', () => {
  const returnString =
    'keyframes bounce-in-top{0%{transform:translateY(-500px);animation-timing-function:ease-in;opacity:0;}38%{transform:translateY(0);animation-timing-function:ease-out;opacity:1;}55%{transform:translateY(-65px);animation-timing-function:ease-in;}72%{transform:translateY(0);animation-timing-function:ease-out;}81%{transform:translateY(-28px);animation-timing-function:ease-in;}90%{transform:translateY(0);animation-timing-function:ease-out;}95%{transform:translateY(-8px);animation-timing-function:ease-in;}100%{transform:translateY(0);animation-timing-function:ease-out;}}';
  const re = fixMissingLastSemicolon(testAnimationBounce);
  expect(re).toBe(returnString);
});

test('will separate chained percentages into unique declarations', () => {
  const str =
    '@keyframes shake-horizontal{0%{transform:translateX(0);} 10%, 100%{transform:translateX(0);} 30%,50%, 70%{transform:translateX(-10px);} 20%{transform:translateX(10px);} 40%{transform:translateX(10px);} 60%{transform:translateX(10px);} 80%{transform:translateX(8px);}90%{transform:translateX(-8px);}}';

  const returnStr =
    '@keyframes shake-horizontal{0%{transform:translateX(0);} 10% {transform:translateX(0);} 100% {transform:translateX(0);} 30% {transform:translateX(-10px);} 50% {transform:translateX(-10px);} 70% {transform:translateX(-10px);} 20%{transform:translateX(10px);} 40%{transform:translateX(10px);} 60%{transform:translateX(10px);} 80%{transform:translateX(8px);}90%{transform:translateX(-8px);}}';

  const re = fixChainedPercentage(str);
  expect(re).toBe(returnStr);
});

test('will change `transform-origin` keys into `TransformOrigin`', () => {
  const expectedReturn =
    'keyframes slide-in-elliptic-top-fwd{0%{transform:translateY(-600px) rotateX(-30deg) scale(0);transformOrigin:50% 100%;opacity:0}100%{transform:translateY(0) rotateX(0) scale(1);transformOrigin:50% 1400px;opacity:1}}';

  const re = fixTransformOrigin(testAnimationTransformOrigin);
  expect(re).toEqual(expectedReturn);
});

test('will convert percentage to decimal values', () => {
  const re2 = convertPercentagesToDecimal('34%');
  expect(re2).toBe(0.34);

  const re = convertPercentagesToDecimal('0%');
  expect(re).toBe(0);
});

test('will return Web Animation API objects from CSS keyframes', () => {
  const obj = {
    '0%': {
      children: {},
      attributes: {
        transform: 'translateY(-500px)',
        'animation-timing-function': 'ease-in',
        opacity: '0',
      },
    },
    '38%': {
      children: {},
      attributes: {
        transform: 'translateY(0)',
        'animation-timing-function': 'ease-out',
        opacity: '1',
      },
    },
    '55%': {
      children: {},
      attributes: {
        transform: 'translateY(-65px)',
        'animation-timing-function': 'ease-in',
      },
    },
    '72%': {
      children: {},
      attributes: {
        transform: 'translateY(0)',
        'animation-timing-function': 'ease-out',
      },
    },
    '81%': {
      children: {},
      attributes: {
        transform: 'translateY(-28px)',
        'animation-timing-function': 'ease-in',
      },
    },
    '90%': {
      children: {},
      attributes: {
        transform: 'translateY(0)',
        'animation-timing-function': 'ease-out',
      },
    },
    '95%': {
      children: {},
      attributes: {
        transform: 'translateY(-8px)',
        'animation-timing-function': 'ease-in',
      },
    },
    '100%': {
      children: {},
      attributes: {
        transform: 'translateY(0)',
        'animation-timing-function': 'ease-out',
      },
    },
  };
  const keyframes = [
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

  const re = buildWaaObjects(obj);
  expect(re).toEqual(keyframes);
});
