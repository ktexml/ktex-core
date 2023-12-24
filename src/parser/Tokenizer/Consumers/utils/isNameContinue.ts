import { isDigit } from "./isDigit";
import { isLetter } from "./isLetter";

export function isNameContinue(char: number) {
  return isLetter(char) || isDigit(char) || char === 95;
}
