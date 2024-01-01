import { TokenKind, type CharStream } from "~/parser";
import type { ConsumerFunction } from ".";
import { isDigit } from "./utils/isDigit";
import { isNameStart } from "./utils";

const plusCode = 43;
const minusCode = 45;
const zeroCode = 48;
const dotCode = 46;
const expCode1 = 69;
const expCode2 = 101;

export const numberConsumer: ConsumerFunction = ({ ctx, pos, char }) => {
  if (ctx.isOperator) {
    const integerPartLength = integerPartLen(ctx.reader, 0, char);

    if (integerPartLength === 0) {
      return null;
    }

    const fractionalPartLength = fractionalPartLen(
      ctx.reader,
      integerPartLength
    );

    const expPartLength = expPartLen(
      ctx.reader,
      integerPartLength + fractionalPartLength
    );

    const len = integerPartLength + fractionalPartLength + expPartLength;

    const lookahead = ctx.reader.peek(len);
    if (isDigit(lookahead) || lookahead === dotCode || isNameStart(lookahead)) {
      return null;
    }

    const chars = [char];
    for (let i = 1; i < len; i++) {
      chars.push(ctx.reader.consume());
    }

    const isInteger = fractionalPartLength === 0 && expPartLength === 0;
    const kind = isInteger ? TokenKind.IntValue : TokenKind.FloatValue;
    return {
      text: String.fromCharCode(...chars),
      kind,
      pos,
    };
  }

  return null;
};

function isSign(char: number) {
  return char === plusCode || char === minusCode;
}

function integerPartLen(reader: CharStream, pos: number, char: number): number {
  const signLength = isSign(char) ? 1 : 0;
  let len = signLength;

  // single zero
  const nextChar = len == 0 ? char : reader.peek(pos + len);
  if (nextChar === zeroCode) {
    return len + 1;
  }

  // consume digits: first digit is not zero (because of the previous check)
  while (!reader.eof()) {
    const nextChar = len == 0 ? char : reader.peek(pos + len);

    if (!isDigit(nextChar)) {
      break;
    }

    len++;
  }

  if (len === signLength) {
    return 0;
  }

  return len;
}

function fractionalPartLen(reader: CharStream, pos: number) {
  const char = reader.peek(pos);

  if (char !== dotCode) {
    return 0;
  }

  let len = 1;

  while (!reader.eof()) {
    const nextChar = reader.peek(pos + len);

    if (!isDigit(nextChar)) {
      break;
    }

    len++;
  }

  return len;
}

function expPartLen(reader: CharStream, pos: number) {
  const char = reader.peek(pos);

  if (char !== expCode1 && char !== expCode2) {
    return 0;
  }

  let len = 1;

  len += isSign(reader.peek(pos + len)) ? 1 : 0;

  while (!reader.eof()) {
    const nextChar = reader.peek(pos + len);

    if (!isDigit(nextChar)) {
      break;
    }

    len++;
  }

  if (len < 2) {
    return 0;
  }

  return len;
}
