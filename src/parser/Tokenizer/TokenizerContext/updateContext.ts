import { TokenKind, type Token } from "../Token";
import type { TokenizerContext } from "../TokenizerContext";

/**
 * This function is called after consuming a token to keep maintaining the context.
 *
 * @param ctx context before consuming the token
 * @param token consumed token
 */
export function updateContext(ctx: TokenizerContext, token: Token) {
  if (token.kind === TokenKind.LineTerminator) {
    ctx.isLineStart = true;
  } else if (token.kind !== TokenKind.WhiteSpace) {
    ctx.isLineStart = false;
  }

  if (token.kind === TokenKind.Punctuator) {
    if (token.text === "[") {
      ctx.isOperator = true;
    } else if (token.text === "]") {
      ctx.isOperator = false;
    }
  }
}
