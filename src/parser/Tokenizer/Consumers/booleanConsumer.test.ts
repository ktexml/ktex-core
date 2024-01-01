import { describe, test } from "bun:test";
import { buildTestConsumed, buildTestNotConsumed } from "~/test/tokens";
import { booleanConsumer } from "./booleanConsumer";
import { TokenKind } from "..";

describe("booleanConsumer", () => {
  const kind = TokenKind.BooleanValue;
  const consumer = booleanConsumer;

  describe("isOperator", () => {
    const opts = { isOperator: true };

    const testConsumed = buildTestConsumed(consumer, kind, opts);

    const testNotConsumed = buildTestNotConsumed(consumer, opts);

    test("positive scenarios", () => {
      testConsumed("true");
      testConsumed("true ", "true");
      testConsumed("false");
      testConsumed("false ", "false");
    });

    test("negative scenarios", () => {
      testNotConsumed("tru");
      testNotConsumed("fals");
      testNotConsumed("trueName");
      testNotConsumed("falseName");
    });
  });

  describe("!isOperator", () => {
    const opts = { isOperator: false };

    const testNotConsumed = buildTestNotConsumed(consumer, opts);

    test("negative scenarios", () => {
      testNotConsumed("true");
      testNotConsumed("false");
    });
  });
});
