import type { ConsumerFunction } from "..";
import { TokenKind } from "../..";

const hyphenCode = 45;

export const dashConsumer: ConsumerFunction = ({ ctx, char, pos }) => {
  if (char === hyphenCode) {
    if (ctx.reader.peek(1) === hyphenCode) {
      if (ctx.reader.peek(2) === hyphenCode) {
        return {
          kind: TokenKind.Punctuation,
          text: String.fromCharCode(
            char,
            ctx.reader.consume(),
            ctx.reader.consume()
          ),
          pos,
        };
      } else {
        return {
          kind: TokenKind.Punctuation,
          text: String.fromCharCode(char, ctx.reader.consume()),
          pos,
        };
      }
    }
  }

  return null;
};
