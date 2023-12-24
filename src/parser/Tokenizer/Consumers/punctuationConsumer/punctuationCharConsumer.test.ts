import { describe, test } from "bun:test";
import { buildTestConsumed, buildTestNotConsumed } from "~/test/tokens";
import { punctuationCharConsumer } from "./punctuationCharConsumer";
import { TokenKind } from "../..";

const testConsumed = buildTestConsumed(
  punctuationCharConsumer,
  TokenKind.Punctuation
);

const testNotConsumed = buildTestNotConsumed(punctuationCharConsumer);

describe("punctuationCharConsumer", () => {
  test("consumes punctuation char", () => {
    testConsumed("?");
    testConsumed("!");
    testConsumed(",");
    testConsumed(":");
    testConsumed(";");
    testConsumed("(");
    testConsumed(")");
    testConsumed('"');
    testConsumed("“");
    testConsumed("”");
    testConsumed("„");
    testConsumed("«");
    testConsumed("»");
    testConsumed("'");
    testConsumed("‘");
    testConsumed("’");
    testConsumed("‚");
    testConsumed("‹");
    testConsumed("›");
    testConsumed("–");
    testConsumed("—");
    testConsumed("…");
  });

  test("does not consume other chars", () => {
    testNotConsumed("a");
    testNotConsumed("1");
    testNotConsumed("$");
    testNotConsumed(" ");
  });
});
