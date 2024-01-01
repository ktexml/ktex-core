import { buildTestConsumed, buildTestNotConsumed } from "~/test/tokens";
import { bomConsumer } from "./bomConsumer";
import { TokenKind } from "..";
import { describe, test } from "bun:test";

const testConsumed = buildTestConsumed(bomConsumer, TokenKind.BOM);

const testNotConsumed = buildTestNotConsumed(bomConsumer);

describe("bomConsumer", () => {
  test("consumes BOM", () => {
    testConsumed("\uFEFF");
    testConsumed("\uFEFF\uFEFF", "\uFEFF");
    testConsumed("\uFEFFa", "\uFEFF");
  });

  test("does not consume non-BOM", () => {
    testNotConsumed("a");
    testNotConsumed("a\uFEFF");
  });
});
