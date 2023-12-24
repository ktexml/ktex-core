import type { ConsumerFunction } from ".";
import { TokenKind } from "..";

const openBracket = 91;
const closeBracket = 93;

// [ { }
const outsidePunctuators = new Set([openBracket, 123, 125]);

// ] =
const insidePunctuators = new Set([closeBracket, 61]);

export const punctuatorConsumer: ConsumerFunction = ({ ctx, char, pos }) => {
  if (ctx.isOperator) {
    if (insidePunctuators.has(char)) {
      if (char === closeBracket) {
        ctx.isOperator = false;
      }

      return {
        kind: TokenKind.Punctuator,
        text: String.fromCharCode(char),
        pos,
      };
    }
  } else {
    if (outsidePunctuators.has(char)) {
      if (char === openBracket) {
        ctx.isOperator = true;
      }

      return {
        kind: TokenKind.Punctuator,
        text: String.fromCharCode(char),
        pos,
      };
    }
  }

  return null;
};
