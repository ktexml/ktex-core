import { expect, test } from "bun:test";
import { isNameStart } from ".";

test("isNameStart", () => {
  expect(isNameStart(64)).toBeFalse();
  expect(isNameStart(65)).toBeTrue();
  expect(isNameStart(90)).toBeTrue();
  expect(isNameStart(91)).toBeFalse();

  expect(isNameStart(96)).toBeFalse();
  expect(isNameStart(97)).toBeTrue();
  expect(isNameStart(122)).toBeTrue();
  expect(isNameStart(123)).toBeFalse();

  expect(isNameStart(47)).toBeFalse();
  expect(isNameStart(48)).toBeFalse();
  expect(isNameStart(57)).toBeFalse();
  expect(isNameStart(58)).toBeFalse();
});
