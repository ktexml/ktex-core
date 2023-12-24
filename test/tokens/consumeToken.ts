import type { ConsumerFunction } from "~/parser/Tokenizer/Consumers";
import { buildContext } from "./Contex";
import type { Token, TokenKind, TokenizerContext } from "~/parser";
import { expect } from "bun:test";

type ContextInput = {
  isLineStart?: boolean;
  isOperator?: boolean;
};

type ConsumptionResult = { token: Token; ctx: TokenizerContext };

type TestConsumedFunction = (
  src: string,
  expText?: string
) => ConsumptionResult;

type TestNotConsumedFunction = (src: string) => void;

export function consumeToken(
  fn: ConsumerFunction,
  src: string,
  ctxInput?: ContextInput
) {
  const ctx = buildContext(src, ctxInput);
  const char = ctx.reader.consume();
  const pos = ctx.reader.position();

  return {
    token: fn({ ctx, pos, char }),
    ctx,
  };
}

export function buildTestConsumed(
  fn: ConsumerFunction,
  expKind: TokenKind,
  ctxInput?: ContextInput
): TestConsumedFunction {
  return function testConsumed(src: string, expText: string = src) {
    const { token, ctx } = consumeToken(fn, src, ctxInput);

    expect(token).not.toBeNull();

    if (token == null) throw new Error("Token was not consumed!");

    expect(token.kind).toBe(expKind);
    expect(token.pos.overall).toBe(0);
    expect(token.text).toBe(expText);
    expect(ctx.reader.position().overall).toBe(expText.length - 1);

    return { token, ctx };
  };
}

export function buildTestNotConsumed(
  fn: ConsumerFunction,
  ctxInput?: ContextInput
): TestNotConsumedFunction {
  return function testNotConsumed(src: string) {
    const { token, ctx } = consumeToken(fn, src, ctxInput);

    expect(token).toBeNull();
    expect(ctx.reader.position().overall).toBe(0);
  };
}
