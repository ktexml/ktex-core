import type { Alphabet } from "~/dict";
import { StringReader, type TokenizerContext } from "~/parser";

type Input = {
  isLineStart?: boolean;
  isOperator?: boolean;
  alphabets?: Alphabet[];
};

export function buildContext(src: string, input?: Input): TokenizerContext {
  const defaults = {
    isLineStart: true,
    isOperator: false,
    alphabets: [],
  };

  return {
    reader: new StringReader(src),
    ...defaults,
    ...input,
  };
}
