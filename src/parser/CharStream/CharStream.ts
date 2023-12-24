import type { Pos } from "./Pos";

/**
 * Interface for reading characters as used by Lexer.
 */
export interface CharStream {
  /**
   * Consumes the next character and returns it.
   * Throws an error if the stream has reached the end.
   */
  consume(): number;

  /**
   * Returns the next character without consuming it.
   * Returns -1 if the stream has reached the end.
   *
   * @param pos The position relative to the current position.
   */
  peek(pos?: number): number;

  /**
   * Return `true` if the stream has reached the end.
   *
   * @param pos The position relative to the current position.
   */
  eof(pos?: number): boolean;

  /**
   * Returns *a copy* of the current position.
   */
  position(): Pos;
}
