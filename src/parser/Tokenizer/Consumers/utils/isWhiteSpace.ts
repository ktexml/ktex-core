const tabCode = 0x09;
const spaceCode = 0x20;

export function isWhiteSpace(char: number): boolean {
  return char === tabCode || char === spaceCode;
}
