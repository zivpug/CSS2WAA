import {
  buildWaaObjects,
  fixTransformOrigin,
  fixChainedPercentage,
  fixMissingLastSemicolon,
  convertPercentagesToDecimal,
  css2waa, fixNamedPercentagesAndClean,
} from './CSS2WAA';
import * as vars from "./testVars";



test('returns correct WAA object', () => {
  const re = css2waa(vars.testAnimationWobble);
  expect(re).toEqual(vars.returnAnimationWobble);

  const re1 = css2waa(vars.testAnimationBounce);
  expect(re1).toEqual(vars.returnTestAnimation);

  const re2 = css2waa(vars.testAnimationTransformOrigin);
  expect(re2).toEqual(vars.returnAnimationTransformOrigin);

  const re3 = css2waa(vars.tesAnimationPercentages)
  expect(re3).toEqual(vars.returnedWaaFromPercentage)
});

test("will clean string and replace named percentages (to/from) to numbers", () => {
  const re = fixNamedPercentagesAndClean(vars.tesAnimationPercentages)
  expect(re).toBe(vars.returnedAnimationPercentages)
})

test('will add missing semicolons', () => {
  const re = fixMissingLastSemicolon(vars.testAnimationBounce);
  expect(re).toBe(vars.returnMissingSemicolonString);
});

test('will separate chained percentages into unique declarations', () => {
  const re = fixChainedPercentage(vars.chainedPercentageString);
  expect(re).toBe(vars.returnChainedPercentageFixed);
});

test('will change `transform-origin` keys into `TransformOrigin`', () => {
  const re = fixTransformOrigin(vars.testAnimationTransformOrigin);
  expect(re).toEqual(vars.returnedTransformOrigin);
});

test('will convert percentage to decimal values', () => {
  const re2 = convertPercentagesToDecimal('34%');
  expect(re2).toBe(0.34);

  const re = convertPercentagesToDecimal('0%');
  expect(re).toBe(0);
});

test('will return Web Animation API objects from CSS keyframes', () => {

  const re = buildWaaObjects(vars.testWaaObj);
  expect(re).toEqual(vars.returnedKeyframes);
});
