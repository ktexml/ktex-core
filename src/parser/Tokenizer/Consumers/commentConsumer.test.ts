import { describe, test } from "bun:test";
import { TokenKind } from "..";
import { buildTestConsumed, buildTestNotConsumed } from "~/test/tokens";
import { commentConsumer } from "./commentConsumer";

const testConsumed = buildTestConsumed(commentConsumer, TokenKind.Comment);

const testNotConsumed = buildTestNotConsumed(commentConsumer);

describe("commentConsumer", () => {
  test("first % is consumed until end of the line", () => {
    const expText = "% This is a comment";
    testConsumed("% This is a comment", expText);
    testConsumed("% This is a comment\n", expText);
    testConsumed("% This is a comment\nthis is another line", expText);
    testConsumed("% This is a comment\r", expText);
  });

  test("other first token is not consumed", () => {
    testNotConsumed("$ This is a comment");
    testNotConsumed("// This is a comment");
    testNotConsumed(" % This is a comment");
  });
});
