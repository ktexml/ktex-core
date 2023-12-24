import { describe, test } from "bun:test";
import { buildTestConsumed, buildTestNotConsumed } from "~/test/tokens";
import { dashConsumer } from "./dashConsumer";
import { TokenKind } from "../..";

const testConsumed = buildTestConsumed(dashConsumer, TokenKind.Punctuation);
const testNotConsumed = buildTestNotConsumed(dashConsumer);

describe("dashConsumer", () => {
  test("consumes en- and em- dashes", () => {
    testConsumed("--");
    testConsumed("---");
    testConsumed("---a", "---");
    testConsumed("-- -", "--");
  });

  test("does not consume single hyphens and other chars", () => {
    testNotConsumed("-");
    testNotConsumed("- -");
    testNotConsumed("-a");
    testNotConsumed("a---");
  });
});
