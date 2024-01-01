import type { ConsumerFunction } from ".";
import { TokenKind } from "..";

export const bomConsumer: ConsumerFunction = (input) => {
  const { pos, char } = input;

  if (char === 0xfeff) {
    return {
      text: String.fromCharCode(char),
      kind: TokenKind.BOM,
      pos,
    };
  }

  return null;
};
