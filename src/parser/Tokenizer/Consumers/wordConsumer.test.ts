import { buildTestConsumed, buildTestNotConsumed } from "~/test/tokens";
import { wordConsumer } from "./wordConsumer";
import { TokenKind } from "..";
import { describe, test } from "bun:test";

const testConsumed = buildTestConsumed(wordConsumer, TokenKind.Word);

const testNotConsumed = buildTestNotConsumed(wordConsumer);

describe("wordConsumer", () => {
  test("consumes a word", () => {
    testConsumed("hello");
    testConsumed("hello-world");
    testConsumed("hello--world", "hello");
    testConsumed("hello world", "hello");
    testConsumed("\\'cause");
    testConsumed("comm\\'n");
  });

  test("does not consume a word", () => {
    testNotConsumed(" ");
    testNotConsumed("-hi");
    testNotConsumed("აბგ");
  });
});
