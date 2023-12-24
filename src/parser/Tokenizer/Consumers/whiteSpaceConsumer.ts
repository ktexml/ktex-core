import type { ConsumerFunction } from ".";
import { TokenKind } from "..";
import { isWhiteSpace } from "./utils";

export const whiteSpaceConsumer: ConsumerFunction = (input) => {
  const { char, ctx, pos } = input;

  if (isWhiteSpace(char)) {
    const chars = [char];

    while (!ctx.reader.eof()) {
      if (!isWhiteSpace(ctx.reader.peek())) {
        break;
      }

      chars.push(ctx.reader.consume());
    }

    return {
      kind: TokenKind.WhiteSpace,
      pos,
      text: String.fromCharCode(...chars),
    };
  }

  return null;
};
