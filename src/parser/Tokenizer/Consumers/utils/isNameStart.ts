import { isLetter } from "./isLetter";

export function isNameStart(char: number) {
  return isLetter(char) || char === 95;
}
