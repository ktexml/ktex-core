import type { ConsumerFunction } from ".";
import { TokenKind } from "..";
import { buildName, isNameStart } from "./utils";

export const nameConsumer: ConsumerFunction = ({ ctx, char, pos }) => {
  if (ctx.isOperator) {
    if (isNameStart(char)) {
      return {
        text: buildName(char, ctx.reader, pos),
        kind: TokenKind.Name,
        pos,
      };
    }
  }

  return null;
};
