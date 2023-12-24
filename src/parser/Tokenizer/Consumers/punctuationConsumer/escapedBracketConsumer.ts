import type { ConsumerFunction } from "..";
import { TokenKind } from "../..";

const backslashCode = 92;

// [ ] { }
const bracketCodes = new Set([91, 93, 123, 125]);

export const escapedBracketConsumer: ConsumerFunction = (input) => {
  const { char, pos, ctx } = input;

  if (char === backslashCode) {
    if (bracketCodes.has(ctx.reader.peek())) {
      return {
        kind: TokenKind.Punctuation,
        text: String.fromCharCode(char, ctx.reader.consume()),
        pos,
      };
    }
  }

  return null;
};
