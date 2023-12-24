import { test } from "bun:test";
import { buildTestConsumed } from "~/test/tokens";
import { errorCosumer } from "./errorConsumer";
import { TokenKind } from "..";

const testConsumed = buildTestConsumed(errorCosumer, TokenKind.Error);

test("errorCosumer", () => {
  testConsumed("a");
  testConsumed("ab");
  testConsumed("abc def", "abc");
  testConsumed("abc\tdef", "abc");
});
