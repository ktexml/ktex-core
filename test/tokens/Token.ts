import { defaultPos, type Pos, type Token, type TokenKind } from "~/parser";

type Input = {
  text?: string;
  pos?: Pos;
};

export function createBuilder(defaultText: string, kind: TokenKind) {
  return (input?: Input): Token => {
    const defaults = {
      text: defaultText,
      pos: defaultPos(),
    };

    return {
      kind,
      ...defaults,
      ...input,
    };
  };
}
