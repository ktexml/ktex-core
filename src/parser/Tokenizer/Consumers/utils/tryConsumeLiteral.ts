import type { CharStream } from "~/parser";
import { isNameContinue } from ".";

type Input = {
  literal: string;
  char: number;
  reader: CharStream;
};

type Output = string | null;

/**
 * Tries to consume a literal based on the literal string provided.
 */
export function tryConsumeLiteral({ literal, char, reader }: Input): Output {
  if (char === literal.charCodeAt(0)) {
    const len = literal.length;

    for (let i = 1; i < len; i++) {
      if (reader.eof(i)) {
        return null;
      }

      if (reader.peek(i) !== literal.charCodeAt(i)) {
        return null;
      }
    }

    if (reader.eof(len) || !isNameContinue(reader.peek(len))) {
      const chars = [char];
      for (let i = 1; i < len; i++) {
        chars.push(reader.consume());
      }

      return String.fromCharCode(...chars);
    }
  }

  return null;
}
