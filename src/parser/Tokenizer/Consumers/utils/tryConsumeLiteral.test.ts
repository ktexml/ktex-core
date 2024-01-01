import { describe, expect, test } from "bun:test";
import { tryConsumeLiteral } from "./tryConsumeLiteral";
import { StringReader } from "~/parser";

function testConsumed(src: string, literal: string = src) {
  const reader = new StringReader(src);
  const char = reader.consume();
  const result = tryConsumeLiteral({ literal, char, reader });

  expect(result).not.toBeNull();
  expect(result).toBe(literal);
  expect(reader.position().overall).toBe(literal.length - 1);
}

function testNotConsumed(src: string, literal: string) {
  const reader = new StringReader(src);
  const char = reader.consume();
  const result = tryConsumeLiteral({ literal, char, reader });

  expect(result).toBeNull();
}

describe("tryConsumeLiteral", () => {
  test("positive scenarios", () => {
    testConsumed("true");
    testConsumed("true ", "true");
  });

  test("negative scenarios", () => {
    testNotConsumed("tru", "true");
    testNotConsumed("true_", "true");
    testNotConsumed("trueName", "true");
  });
});
