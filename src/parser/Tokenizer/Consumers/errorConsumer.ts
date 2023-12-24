import type { ConsumerFunction } from ".";
import { TokenKind } from "..";
import { isWhiteSpace } from "./utils";

/**
 * Consumes error: all characters until the next whitespace.
 */
export const errorCosumer: ConsumerFunction = ({ char, ctx, pos }) => {
  const chars = [char];

  const reader = ctx.reader;

  while (!reader.eof()) {
    if (isWhiteSpace(reader.peek())) {
      break;
    }

    chars.push(reader.consume());
  }

  return {
    text: String.fromCharCode(...chars),
    kind: TokenKind.Error,
    pos,
  };
};
