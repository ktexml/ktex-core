import { describe, expect, test } from "bun:test";
import {
  buildContext,
  buildIntValue,
  buildLineTerminator,
  buildPunctuator,
  buildWhiteSpace,
  buildWord,
} from "~/test/tokens";
import { updateContext } from ".";

describe("updateContext", () => {
  test("isLineStart update", () => {
    const ctx = buildContext("...");

    // " "
    updateContext(ctx, buildWhiteSpace());
    expect(ctx.isLineStart).toBeTrue();

    // " cat"
    updateContext(ctx, buildWord({ text: "cat" }));
    expect(ctx.isLineStart).toBeFalse();

    // " cat\n"
    updateContext(ctx, buildLineTerminator());
    expect(ctx.isLineStart).toBeTrue();

    // " cat\n "
    updateContext(ctx, buildWhiteSpace());
    expect(ctx.isLineStart).toBeTrue();

    // " cat\n dog"
    updateContext(ctx, buildWord({ text: "dog" }));
    expect(ctx.isLineStart).toBeFalse();
  });

  test("isOperator update", () => {
    const ctx = buildContext("...");
    expect(ctx.isOperator).toBeFalse();

    // "["
    updateContext(ctx, buildPunctuator({ text: "[" }));
    expect(ctx.isOperator).toBeTrue();

    // "[name"
    updateContext(ctx, buildWord({ text: "name" }));
    expect(ctx.isOperator).toBeTrue();

    // "[name="
    updateContext(ctx, buildPunctuator({ text: "=" }));
    expect(ctx.isOperator).toBeTrue();

    // "[name=123"
    updateContext(ctx, buildIntValue());
    expect(ctx.isOperator).toBeTrue();

    // "[name=123]"
    updateContext(ctx, buildPunctuator({ text: "]" }));
    expect(ctx.isOperator).toBeFalse();
  });
});
