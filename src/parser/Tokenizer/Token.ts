import { type Pos } from "../CharStream";

// TODO: update specs with context

export enum TokenKind {
  // Ignored
  BOM = "BOM",
  Comment = "Comment", // isLineStart

  // context insensitive
  WhiteSpace = "WhiteSpace",
  LineTerminator = "LineTerminator",

  // diff isOperator // !isOperator
  Punctuator = "Punctuator",

  // !isOperator
  OperatorName = "OperatorName",
  Punctuation = "Punctuation",
  Word = "Word",

  // isOperator
  Name = "Name",
  IntValue = "IntValue",
  FloatValue = "FloatValue",
  StringValue = "StringValue",
  BooleanValue = "BooleanValue",
  NullValue = "NullValue",

  // error
  Error = "Error",
}

/**
 * Token interface.
 */
export interface Token {
  kind: TokenKind;
  pos: Pos;
  text: string;
}
