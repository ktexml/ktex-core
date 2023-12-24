import { describe, test } from "bun:test";
import { buildTestConsumed, buildTestNotConsumed } from "~/test/tokens";
import { periodConsumer } from "./periodConsumer";
import { TokenKind } from "../..";

const testConsumed = buildTestConsumed(periodConsumer, TokenKind.Punctuation);
const testNotConsumed = buildTestNotConsumed(periodConsumer);

describe("periodConsumer", () => {
  test("consumes period", () => {
    testConsumed(".");
    testConsumed("..", ".");
    testConsumed("...", ".");
    testConsumed(".a", ".");
  });

  test("doesn't consume other chars", () => {
    testNotConsumed("…");
    testNotConsumed("a");
  });
});
