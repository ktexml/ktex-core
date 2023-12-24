import { buildTestConsumed, buildTestNotConsumed } from "~/test/tokens";
import { operatorNameConsumer } from "./operatorNameConsumer";
import { TokenKind } from "..";
import { describe, test } from "bun:test";

const testConsumed = buildTestConsumed(
  operatorNameConsumer,
  TokenKind.OperatorName
);

const testNotConsumed = buildTestNotConsumed(operatorNameConsumer);

describe("operatorNameConsumer", () => {
  test("should consume operator name", () => {
    testConsumed("\\foo");
    testConsumed("\\_foo");
    testConsumed("\\foo \\bar", "\\foo");
  });

  test("should not consume ", () => {
    testNotConsumed("foo");
    testNotConsumed("\\1foo");
  });
});
