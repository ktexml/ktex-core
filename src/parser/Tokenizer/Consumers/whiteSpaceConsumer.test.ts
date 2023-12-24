import { describe, test } from "bun:test";
import { whiteSpaceConsumer } from "./whiteSpaceConsumer";
import { buildTestConsumed, buildTestNotConsumed } from "~/test/tokens";
import { TokenKind } from "~/parser";

const testConsumed = buildTestConsumed(
  whiteSpaceConsumer,
  TokenKind.WhiteSpace
);

const testNotConsumed = buildTestNotConsumed(whiteSpaceConsumer);

describe("whiteSpaceConsumer", () => {
  test("first space char is consumed", () => {
    testConsumed(" ");
    testConsumed("  ");
    testConsumed(" text", " ");
    testConsumed(" \t");
  });

  test("first tab char is consumed", () => {
    testConsumed("\t");
    testConsumed("\t\t");
    testConsumed("\ttext", "\t");
    testConsumed("\t ");
  });

  test("no other first character is consumed", () => {
    testNotConsumed("a");
    testNotConsumed("a ");
    testNotConsumed("_ ");
    testNotConsumed("\n ");
  });
});
