import type { CharStream } from ".";

/**
 * Type for tracking position in the source code.
 */
export type Pos = {
  /**
   * The overall position in the source code (0-based).
   */
  overall: number;

  /**
   * The line number in the source code (1-based).
   */
  line: number;

  /**
   * The column number in the source code (1-based).
   */
  column: number;
};

/**
 * Creates default position to start from.
 */
export function defaultPos(): Pos {
  return {
    overall: -1, // -1 because the first character is at position 0 and we haven't consumed it yet
    line: 1,
    column: 0,
  };
}

const newLineCode = 0x0a;
const carriageReturnCode = 0x0d;

/**
 * Update a position based on a character that was consumed.
 * This should be called after consuming each character.
 *
 * @param pos A position to update.
 * @param char The character that was consumed.
 * @param reader The CharStream that consumed the character.
 */
export function updatePos(pos: Pos, char: number, reader: CharStream) {
  pos.overall += 1;

  // LineTerminator ::
  //     \n              move to the next line
  //     \r [next != \n] move to the next line
  //     \r [next == \n] don't move to the next line

  let moveToNextLine = false;

  if (char === newLineCode) {
    moveToNextLine = true;
  } else if (char === carriageReturnCode) {
    const nextChar = reader.peek();
    moveToNextLine = nextChar !== newLineCode;
  }

  if (moveToNextLine) {
    pos.line += 1;
    pos.column = 0;
  } else {
    pos.column += 1;
  }
}
