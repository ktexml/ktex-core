import type { Alphabet } from "~/dict";
import type { CharStream } from "../../CharStream";

/**
 * Context used by the tokenizer.
 */
export type TokenizerContext = {
  /**
   * Char stream to read from.
   */
  reader: CharStream;

  /**
   * Indicates that we are within OperatorOptions construct,
   * i.e. within [...].
   */
  isOperator: boolean;

  /**
   * Indicates that we are at a new line and have not read
   * any non-whitespace characters yet.
   */
  isLineStart: boolean;

  /**
   * Contains the alphabets to use.
   * Note that the {DefaultAlphabet} is always used,
   * no matter if it's listed here or not.
   */
  alphabets: Alphabet[];
};
