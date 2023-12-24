import { TokenKind } from "~/parser";
import { createBuilder } from "./Token";

export { buildContext } from "./Contex";

export {
  consumeToken,
  buildTestConsumed,
  buildTestNotConsumed,
} from "./consumeToken";

export const buildLineTerminator = createBuilder(
  "\n",
  TokenKind.LineTerminator
);
export const buildWhiteSpace = createBuilder(" ", TokenKind.WhiteSpace);
export const buildWord = createBuilder("cat", TokenKind.Word);
export const buildPunctuator = createBuilder("(", TokenKind.Punctuator);
export const buildName = createBuilder("name", TokenKind.Name);
export const buildIntValue = createBuilder("123", TokenKind.IntValue);
