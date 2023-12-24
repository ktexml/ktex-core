import type { ConsumerFunction } from ".";
import { TokenKind } from "..";
import { tryConsumeLiteral } from "./utils";

export const booleanConsumer: ConsumerFunction = ({ ctx, char, pos }) => {
  if (ctx.isOperator) {
    if (tryConsumeLiteral({ literal: "true", char, reader: ctx.reader })) {
      return {
        kind: TokenKind.BooleanValue,
        text: "true",
        pos,
      };
    }

    if (tryConsumeLiteral({ literal: "false", char, reader: ctx.reader })) {
      return {
        kind: TokenKind.BooleanValue,
        text: "false",
        pos,
      };
    }
  }

  return null;
};
