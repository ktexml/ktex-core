import { describe, expect, test } from "bun:test";
import { Tokenizer } from "./Tokenizer";
import { StringReader } from "..";

describe("Tokenizer", () => {
  function buildTokenizer(src: string) {
    return new Tokenizer(new StringReader(src));
  }

  test("consume", () => {
    const tokenizer = buildTokenizer("hello world!");

    expect(tokenizer.consume().text).toBe("hello");
    expect(tokenizer.consume().text).toBe(" ");
    expect(tokenizer.consume().text).toBe("world");
    expect(tokenizer.consume().text).toBe("!");
    expect(() => tokenizer.consume()).toThrow("Cannot consume past EOF");
  });

  test("peek then consume", () => {
    const tokenizer = buildTokenizer("hello world!");

    expect(tokenizer.peek(1)?.text).toBe("hello");
    expect(tokenizer.peek(2)?.text).toBe(" ");
    expect(tokenizer.peek(3)?.text).toBe("world");
    expect(tokenizer.peek(4)?.text).toBe("!");
    expect(tokenizer.peek(5)).toBeNull();
    expect(tokenizer.peek(6)).toBeNull();

    expect(tokenizer.consume().text).toBe("hello");
    expect(tokenizer.consume().text).toBe(" ");
    expect(tokenizer.consume().text).toBe("world");
    expect(tokenizer.consume().text).toBe("!");
    expect(tokenizer.eof()).toBeTrue();
    expect(() => tokenizer.consume()).toThrow("Cannot consume past EOF");
  });
});
