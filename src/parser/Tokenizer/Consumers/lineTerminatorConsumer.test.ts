import { describe, test } from "bun:test";
import { TokenKind } from "~/parser";
import { buildTestConsumed, buildTestNotConsumed } from "~/test/tokens";
import { lineTerminatorConsumer } from "./lineTerminatorConsumer";

const testConsumed = buildTestConsumed(
  lineTerminatorConsumer,
  TokenKind.LineTerminator
);

const testNotConsumed = buildTestNotConsumed(lineTerminatorConsumer);

describe("lineTerminatorConsumer", () => {
  test("first \\n char is consumed", () => {
    const expText = "\n";

    testConsumed("\n", expText);
    testConsumed("\n\n", expText);
    testConsumed("\n\r", expText);
    testConsumed("\ntext", expText);
  });

  test("first \\r char is consumed", () => {
    const expText = "\r";

    testConsumed("\r", expText);
    testConsumed("\r\r", expText);
    testConsumed("\rtext", expText);
  });

  test("first \\r\\n chars are consumed", () => {
    const expText = "\r\n";

    testConsumed("\r\n", expText);
    testConsumed("\r\ntext", expText);
  });

  test("no other first char is consumed", () => {
    testNotConsumed("a\n");
    testNotConsumed("a\r");
    testNotConsumed("\t");
    testNotConsumed(" ");
  });
});
