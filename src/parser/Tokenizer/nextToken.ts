import { allConsumers } from "./Consumers";
import { type Token } from "./Token";
import { updateContext, type TokenizerContext } from "./TokenizerContext";

export function nextToken(ctx: TokenizerContext): Token | null {
  if (ctx.reader.eof()) return null;

  const char = ctx.reader.consume();
  const pos = ctx.reader.position();

  for (const consumerFunction of allConsumers) {
    const token = consumerFunction({ ctx, char, pos });

    if (token != null) {
      updateContext(ctx, token);
      return token;
    }
  }

  throw new Error("Unexpected situation...");
}
