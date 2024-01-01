import type { Pos } from "~/parser";
import type { Token, TokenizerContext } from "..";

export type ConsumerInput = {
  /**
   * Tokenizer context.
   */
  ctx: TokenizerContext;

  /**
   * Current character.
   */
  char: number;

  /**
   * Current position in the source code.
   */
  pos: Pos;
};

type ConsumerOutput = Token | null;

/**
 * A function that consumes a character and returns iterator of tokens.
 */
export type ConsumerFunction = (input: ConsumerInput) => ConsumerOutput;
