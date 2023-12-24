import type { ConsumerFunction } from "..";
import { TokenKind } from "../..";

const periodCode = 46;

export const ellipsisConsumer: ConsumerFunction = ({ ctx, char, pos }) => {
  if (char === periodCode) {
    if (ctx.reader.peek() === periodCode) {
      if (ctx.reader.peek(2) === 46) {
        return {
          kind: TokenKind.Punctuation,
          text: String.fromCharCode(
            char,
            ctx.reader.consume(),
            ctx.reader.consume()
          ),
          pos,
        };
      }
    }
  }

  return null;
};
