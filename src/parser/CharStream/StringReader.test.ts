import { describe, expect, test } from "bun:test";
import { StringReader } from "./StringReader";
import type { Pos } from "./Pos";

describe("StringReader", () => {
  test("should be able to consume", () => {
    const reader = new StringReader("Hello, world!");

    const out = [];

    while (!reader.eof()) {
      out.push(String.fromCharCode(reader.consume()));
    }

    expect(out.join("")).toEqual("Hello, world!");
    expect(reader.eof()).toBe(true);
    expect(() => reader.consume()).toThrow("Cannot read past EOF");
  });

  test("should be able to peek", () => {
    const reader = new StringReader("Hello, world!");

    expect(() => reader.peek(0)).toThrow("Cannot peek backwards");
    expect(reader.peek(1)).toEqual("H".charCodeAt(0));
    expect(reader.peek(2)).toEqual("e".charCodeAt(0));
    expect(reader.peek(3)).toEqual("l".charCodeAt(0));
    expect(reader.peek(13)).toEqual("!".charCodeAt(0));
    expect(reader.eof()).toBe(false);
    expect(reader.peek(14)).toBe(-1);

    expect(reader.consume()).toEqual("H".charCodeAt(0));
  });

  test("should update source position", () => {
    const input = ["a\n", "b\r", "c\r\n"].join("");
    const reader = new StringReader(input);

    const expectedPositions: Pos[] = [
      { overall: 0, line: 1, column: 1 }, // "a"
      { overall: 1, line: 2, column: 0 }, // "a\n"
      { overall: 2, line: 2, column: 1 }, // "a\nb"
      { overall: 3, line: 3, column: 0 }, // "a\nb\r"
      { overall: 4, line: 3, column: 1 }, // "a\nb\rc"
      { overall: 5, line: 3, column: 2 }, // "a\nb\rc\r"
      { overall: 6, line: 4, column: 0 }, // "a\nb\rc\r\n"
    ];

    let index = 0;
    while (!reader.eof()) {
      reader.consume();
      const pos = reader.position();
      expect(pos).toEqual(expectedPositions[index++]);
    }

    expect(reader.eof()).toBe(true);
    expect(reader.position().overall).toBe(input.length - 1);
  });
});
