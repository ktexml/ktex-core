import { describe, test } from "bun:test";
import { buildTestConsumed, buildTestNotConsumed } from "~/test/tokens";
import { ellipsisConsumer } from "./ellipsisConsumer";
import { TokenKind } from "../..";

const testConsumed = buildTestConsumed(ellipsisConsumer, TokenKind.Punctuation);
const testNotConsumed = buildTestNotConsumed(ellipsisConsumer);

describe("ellipsisConsumer", () => {
  test("consumes ellipsis", () => {
    testConsumed("...");
    testConsumed("....", "...");
  });

  test("does not consume other strings", () => {
    testNotConsumed(".");
    testNotConsumed("..");
    testNotConsumed("..a");
  });
});
