import { type CharStream, type Pos } from "~/parser";
import { isNameContinue } from ".";

export function buildName(char: number, reader: CharStream, pos: Pos): string {
  const chars = [char];

  while (isNameContinue(reader.peek())) {
    chars.push(reader.consume());
  }

  return String.fromCharCode(...chars);
}
