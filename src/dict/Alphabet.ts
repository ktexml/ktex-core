/**
 * Interface for describing an alphabet.
 */
export interface Alphabet {
  /**
   * If the char belongs to the alphabet.
   *
   * @param char char to test
   */
  belongs(char: number): boolean;
}
