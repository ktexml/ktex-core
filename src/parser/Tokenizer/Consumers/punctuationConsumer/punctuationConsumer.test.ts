import { describe, test } from "bun:test";
import { punctuationConsumer } from ".";
import { buildTestConsumed, buildTestNotConsumed } from "~/test/tokens";
import { TokenKind } from "../..";

const testConsumed = buildTestConsumed(
  punctuationConsumer,
  TokenKind.Punctuation,
  { isOperator: false }
);

const testNotConsumed = buildTestNotConsumed(punctuationConsumer, {
  isOperator: false,
});

const testNotConsumed2 = buildTestNotConsumed(punctuationConsumer, {
  isOperator: true,
});

describe("punctuationConsumer", () => {
  test("should consume punctuation", () => {
    testConsumed(".");
    testConsumed("…");
    testConsumed("...");
    testConsumed("--");
    testConsumed("\\[");
    testConsumed(".--", ".");
  });

  test("non-punctuation string should not be consumed", () => {
    testNotConsumed("a");
    testNotConsumed("a...");
  });

  test("[isOperator] should not consume punctuation", () => {
    testNotConsumed2(".");
    testNotConsumed2("...");
  });
});
