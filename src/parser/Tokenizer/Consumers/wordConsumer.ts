import { defaultAlphabet } from "~/dict";
import type { ConsumerFunction } from ".";
import { TokenKind, type TokenizerContext } from "..";

const backslackCode = 0x5c;
const apostropheCode = 0x27;
const hyphenCode = 0x2d;

export const wordConsumer: ConsumerFunction = ({ ctx, char, pos }) => {
  if (!ctx.isOperator) {
    const chars = [char];

    if (isApostrophe(char, ctx.reader.peek())) {
      chars.push(ctx.reader.consume());
    } else if (isWordCharacter(char, ctx)) {
      // just continue
    } else {
      return null;
    }

    while (!ctx.reader.eof()) {
      const char = ctx.reader.peek();
      const nextChar = ctx.reader.peek(2);

      if (char === hyphenCode) {
        if (nextChar === hyphenCode) {
          break;
        }
        chars.push(ctx.reader.consume());
      } else if (isApostrophe(char, nextChar)) {
        chars.push(ctx.reader.consume());
        chars.push(ctx.reader.consume());
      } else if (isWordCharacter(char, ctx)) {
        chars.push(ctx.reader.consume());
      } else {
        break;
      }
    }

    return {
      text: String.fromCharCode(...chars),
      kind: TokenKind.Word,
      pos,
    };
  }

  return null;
};

function isApostrophe(char: number, nextChar: number): boolean {
  return char === backslackCode && nextChar === apostropheCode;
}

function isWordCharacter(char: number, ctx: TokenizerContext): boolean {
  if (defaultAlphabet.belongs(char)) {
    return true;
  }

  for (const alphabet of ctx.alphabets) {
    if (alphabet.belongs(char)) {
      return true;
    }
  }

  return false;
}
