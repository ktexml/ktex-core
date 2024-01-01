import { describe, expect, test } from "bun:test";
import { buildContext } from "~/test/tokens";
import { nextToken } from "./nextToken";
import { TokenKind } from ".";

describe("nextToken", () => {
  test("single token", () => {
    const context = buildContext("hello");
    const token = nextToken(context);

    expect(token).not.toBeNull();
    expect(token?.kind).toBe(TokenKind.Word);
    expect(token?.text).toBe("hello");

    expect(nextToken(context)).toBeNull();
  });

  test("two words and some auxilary tokens", () => {
    const context = buildContext("hello world!");
    const token1 = nextToken(context);
    const token2 = nextToken(context);
    const token3 = nextToken(context);
    const token4 = nextToken(context);

    expect(token1).not.toBeNull();
    expect(token1?.kind).toBe(TokenKind.Word);
    expect(token1?.text).toBe("hello");

    expect(token2).not.toBeNull();
    expect(token2?.kind).toBe(TokenKind.WhiteSpace);
    expect(token2?.text).toBe(" ");

    expect(token3).not.toBeNull();
    expect(token3?.kind).toBe(TokenKind.Word);
    expect(token3?.text).toBe("world");

    expect(token4).not.toBeNull();
    expect(token4?.kind).toBe(TokenKind.Punctuation);
    expect(token4?.text).toBe("!");

    expect(nextToken(context)).toBeNull();
  });
});
