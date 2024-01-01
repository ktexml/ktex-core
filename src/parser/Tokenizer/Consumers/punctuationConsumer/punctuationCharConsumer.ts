import type { ConsumerFunction } from "..";
import { TokenKind } from "../..";

const punctuationChar = new Set(
  [
    "?",
    "!",
    ",",
    ":",
    ";",
    "(",
    ")",
    // double quotes
    '"',
    "“",
    "”",
    "„",
    "«",
    "»",
    // single quotes
    "'",
    "‘",
    "’",
    "‚",
    "‹",
    "›",
    // dashes
    "–",
    "—",
    // ellipsis
    "…",
  ].map((char) => char.charCodeAt(0))
);

export const punctuationCharConsumer: ConsumerFunction = ({ char, pos }) => {
  if (punctuationChar.has(char)) {
    return {
      text: String.fromCharCode(char),
      kind: TokenKind.Punctuation,
      pos,
    };
  }

  return null;
};
