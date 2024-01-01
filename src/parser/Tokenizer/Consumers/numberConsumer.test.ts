import { buildTestConsumed, buildTestNotConsumed } from "~/test/tokens";
import { numberConsumer } from "./numberConsumer";
import { TokenKind } from "..";
import { describe, test } from "bun:test";

const opts = { isOperator: true };

const testIntegerConsumed = buildTestConsumed(
  numberConsumer,
  TokenKind.IntValue,
  opts
);
const testFloatConsumed = buildTestConsumed(
  numberConsumer,
  TokenKind.FloatValue,
  opts
);
const testNotConsumed = buildTestNotConsumed(numberConsumer, opts);

describe("numberConsumer", () => {
  test("int consumption", () => {
    testIntegerConsumed("0");
    testIntegerConsumed("+0");
    testIntegerConsumed("-0");
    testIntegerConsumed("123");
    testIntegerConsumed("+123");
    testIntegerConsumed("-123");
    testIntegerConsumed("123 456", "123");
  });

  test("float consumption", () => {
    testFloatConsumed("1.0");
    testFloatConsumed("+1.0");
    testFloatConsumed("-1.0");
    testFloatConsumed("0.00000");
    testFloatConsumed("123.456");
    testFloatConsumed("+123e456");
    testFloatConsumed("-123e+456");
    testFloatConsumed("123e0");
  });

  test("not consumed", () => {
    testNotConsumed("+");
    testNotConsumed("-");
    testNotConsumed("00");
    testNotConsumed("+00");
    testNotConsumed("-00");
    testNotConsumed("123a");
    testNotConsumed("+1.0.");
    testNotConsumed("+1.0.0");
    testNotConsumed(".1");
    testNotConsumed("+.1");
    testNotConsumed("10e");
  });
});
