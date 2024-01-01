import { describe, test } from "bun:test";
import { stringConsumer } from "./stringConsumer";
import { buildTestConsumed, buildTestNotConsumed } from "~/test/tokens";
import { TokenKind } from "..";

const opts = { isOperator: true };

const testConsumed = buildTestConsumed(
  stringConsumer,
  TokenKind.StringValue,
  opts
);

const testNotConsumed = buildTestNotConsumed(stringConsumer, opts);

describe("stringConsumer", () => {
  test("positive scenarios", () => {
    testConsumed(`""`);
    testConsumed(`"hello"`);
    testConsumed(`"hello world"`);
    testConsumed(`"hello \\"world\\"!"`);
    testConsumed(`"hello \\\\world\\\\"`);
    testConsumed(`"hello world" "hello ktex"`, `"hello world"`);
  });

  test("negative scenarios", () => {
    testNotConsumed(`"hello world`);
    testNotConsumed(`"hello world\\"`);
    testNotConsumed(`"`);
    testNotConsumed(`"hello\nworld"`);
    testNotConsumed(`"hello\rworld"`);
    testNotConsumed(`"hello \\n world"`);
  });
});
