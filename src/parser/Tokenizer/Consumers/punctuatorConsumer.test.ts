import { buildTestConsumed, buildTestNotConsumed } from "~/test/tokens";
import { punctuatorConsumer } from "./punctuatorConsumer";
import { TokenKind } from "..";
import { describe, expect, test } from "bun:test";

describe("punctuatorConsumer", () => {
  describe("outside of operator context", () => {
    const testConsumed = buildTestConsumed(
      punctuatorConsumer,
      TokenKind.Punctuator
    );

    const testNotConsumed = buildTestNotConsumed(punctuatorConsumer);

    test("should consume [, {, and }", () => {
      const { ctx } = testConsumed("[");
      expect(ctx.isOperator).toBe(true); // operator context starts here

      testConsumed("{");
      testConsumed("}");
    });

    test("should not consume ] and = or any other char", () => {
      testNotConsumed("]");
      testNotConsumed("=");
      testNotConsumed("a");
    });
  });

  describe("inside of operator context", () => {
    const testConsumed = buildTestConsumed(
      punctuatorConsumer,
      TokenKind.Punctuator,
      { isOperator: true }
    );

    const testNotConsumed = buildTestNotConsumed(punctuatorConsumer, {
      isOperator: true,
    });

    test("should consume ] and =", () => {
      const { ctx } = testConsumed("]");
      expect(ctx.isOperator).toBe(false);

      testConsumed("=");
    });

    test("should not consume [, {, and } or any other char", () => {
      testNotConsumed("[");
      testNotConsumed("{");
      testNotConsumed("}");
      testNotConsumed("a");
    });
  });
});
