import type { Alphabet } from ".";

/**
 * Default alphabet: latin letters and arabic digits.
 */
class DefaultAlphabet implements Alphabet {
  belongs(char: number): boolean {
    return (
      (char >= 97 && char <= 122) || // a-z
      (char >= 65 && char <= 90) || // A-Z
      (char >= 48 && char <= 57) // 0-9
    );
  }
}

export const defaultAlphabet = new DefaultAlphabet();
