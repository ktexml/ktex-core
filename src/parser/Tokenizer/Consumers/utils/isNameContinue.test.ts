import { expect, test } from "bun:test";
import { isNameContinue } from ".";

test("isNameContinue", () => {
  expect(isNameContinue(64)).toBeFalse();
  expect(isNameContinue(65)).toBeTrue();
  expect(isNameContinue(90)).toBeTrue();
  expect(isNameContinue(91)).toBeFalse();

  expect(isNameContinue(96)).toBeFalse();
  expect(isNameContinue(97)).toBeTrue();
  expect(isNameContinue(122)).toBeTrue();
  expect(isNameContinue(123)).toBeFalse();

  expect(isNameContinue(47)).toBeFalse();
  expect(isNameContinue(48)).toBeTrue();
  expect(isNameContinue(57)).toBeTrue();
  expect(isNameContinue(58)).toBeFalse();
});
