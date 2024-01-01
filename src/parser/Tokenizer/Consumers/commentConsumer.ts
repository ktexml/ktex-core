import { TokenKind } from "..";
import type { ConsumerFunction } from "./ConsumerFunction";

const newLine = 0x0a;
const carriageReturn = 0x0d;
const commentStart = "%".charCodeAt(0);

export const commentConsumer: ConsumerFunction = (input) => {
  const { ctx, pos, char } = input;

  if (ctx.isLineStart && char === commentStart) {
    const chars = [char];

    while (!ctx.reader.eof()) {
      const next = ctx.reader.peek();

      if (next === carriageReturn || next === newLine) {
        break;
      }

      chars.push(ctx.reader.consume());
    }

    return {
      kind: TokenKind.Comment,
      pos,
      text: String.fromCharCode(...chars),
    };
  }

  return null;
};
