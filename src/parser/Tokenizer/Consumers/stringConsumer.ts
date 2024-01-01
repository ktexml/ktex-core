import { TokenKind, type CharStream } from "~/parser";
import type { ConsumerFunction } from ".";

const quoteCode = 0x22;
const backslashCode = 0x5c;
const newlineCode = 0x0a;
const carriageReturnCode = 0x0d;

export const stringConsumer: ConsumerFunction = ({ char, ctx, pos }) => {
  if (ctx.isOperator) {
    if (char === quoteCode) {
      const len = strLength(ctx.reader);

      if (len !== -1) {
        const chars = [char];
        for (let i = 0; i < len; i++) {
          chars.push(ctx.reader.consume());
        }
        return {
          kind: TokenKind.StringValue,
          text: String.fromCharCode(...chars),
          pos,
        };
      }
    }
  }

  return null;
};

function strLength(reader: CharStream) {
  let len = 1;

  while (!reader.eof(len)) {
    const char = reader.peek(len);

    if (char === newlineCode || char === carriageReturnCode) {
      return -1;
    } else if (char === quoteCode) {
      return len;
    } else if (char === backslashCode) {
      const nextChar = reader.peek(++len);
      if (nextChar !== quoteCode && nextChar !== backslashCode) {
        return -1;
      }
    }

    len++;
  }

  return -1;
}
