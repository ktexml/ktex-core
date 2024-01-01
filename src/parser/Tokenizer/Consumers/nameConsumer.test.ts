import { describe, test } from "bun:test";
import { buildTestConsumed, buildTestNotConsumed } from "~/test/tokens";
import { nameConsumer } from "./nameConsumer";
import { TokenKind } from "..";

const testConsumed = buildTestConsumed(nameConsumer, TokenKind.Name, {
  isOperator: true,
});

const testNotConsumed = buildTestNotConsumed(nameConsumer, {
  isOperator: true,
});

describe("nameConsumer", () => {
  test("should consume a name", () => {
    testConsumed("a");
    testConsumed("abc");
    testConsumed("abc123");
    testConsumed("_abc123_");
  });

  test("non-consumptions", () => {
    testNotConsumed("1");
    testNotConsumed("2abc");
    testNotConsumed("3_abc");
  });
});
