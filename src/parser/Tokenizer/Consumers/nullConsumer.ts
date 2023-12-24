import type { ConsumerFunction } from ".";
import { TokenKind } from "..";
import { tryConsumeLiteral } from "./utils";

export const nullConsumer: ConsumerFunction = ({ ctx, char, pos }) => {
  if (ctx.isOperator) {
    if (tryConsumeLiteral({ literal: "null", char, reader: ctx.reader })) {
      return {
        kind: TokenKind.BooleanValue,
        text: "null",
        pos,
      };
    }
  }

  return null;
};
