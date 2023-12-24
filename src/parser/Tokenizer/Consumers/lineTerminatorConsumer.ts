import type { ConsumerFunction } from ".";
import { TokenKind, type Token } from "..";

const newLine = 0x0a;
const carriageReturn = 0x0d;

export const lineTerminatorConsumer: ConsumerFunction = (input) => {
  const { ctx, char, pos } = input;

  let token: Token | null = null;

  if (char === newLine) {
    token = {
      kind: TokenKind.LineTerminator,
      pos,
      text: String.fromCharCode(char),
    };
  } else if (char === carriageReturn) {
    if (ctx.reader.peek() !== newLine) {
      token = {
        kind: TokenKind.LineTerminator,
        pos,
        text: String.fromCharCode(char),
      };
    } else {
      token = {
        kind: TokenKind.LineTerminator,
        pos,
        text: String.fromCharCode(char, ctx.reader.consume()),
      };
    }
  }

  return token;
};
