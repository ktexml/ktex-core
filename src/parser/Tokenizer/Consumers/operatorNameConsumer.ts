import type { ConsumerFunction } from ".";
import { TokenKind } from "..";
import { buildName, isNameStart } from "./utils";

const backslashCode = 92;

export const operatorNameConsumer: ConsumerFunction = (input) => {
  const { ctx, char, pos } = input;

  if (!ctx.isOperator) {
    if (char == backslashCode) {
      if (isNameStart(ctx.reader.peek())) {
        return {
          kind: TokenKind.OperatorName,
          text: `\\${buildName(ctx.reader.consume(), ctx.reader, pos)}`,
          pos,
        };
      }
    }
  }

  return null;
};
