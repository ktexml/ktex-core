import type { ConsumerFunction } from "..";
import { TokenKind } from "../..";

const periodCode = 46;

export const periodConsumer: ConsumerFunction = ({ char, pos }) => {
  if (char === periodCode) {
    // Note: we not using lookahead here,
    // because `ellipsisConsumer` is placed
    // before this consumer

    // const char2 = ctx.reader.peek();
    // if (char2 === 46) {
    //   const char3 = ctx.reader.peek(2);
    //   if (char3 === 46) {
    //     return null;
    //   }
    // }

    return {
      kind: TokenKind.Punctuation,
      text: ".",
      pos,
    };
  }

  return null;
};
