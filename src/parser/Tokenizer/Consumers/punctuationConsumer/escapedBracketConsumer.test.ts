import { describe, test } from "bun:test";
import { buildTestConsumed, buildTestNotConsumed } from "~/test/tokens";
import { escapedBracketConsumer } from "./escapedBracketConsumer";
import { TokenKind } from "../..";

const testConsumed = buildTestConsumed(
  escapedBracketConsumer,
  TokenKind.Punctuation
);

const testNotConsumed = buildTestNotConsumed(escapedBracketConsumer);

describe("escapedBracketConsumer", () => {
  test("should consume escaped brackets", () => {
    testConsumed("\\[");
    testConsumed("\\]");
    testConsumed("\\{");
    testConsumed("\\}");
    testConsumed("\\[a", "\\[");
  });

  test("non-escaped brackets should not be consumed", () => {
    testNotConsumed("[");
    testNotConsumed("]");
    testNotConsumed("{");
    testNotConsumed("}");
    testNotConsumed("a\\[");
    testNotConsumed("\\\\");
  });
});
