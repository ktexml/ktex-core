import type { CharStream } from "../CharStream";
import type { Token } from "./Token";
import type { TokenizerContext } from "./TokenizerContext";
import { nextToken } from "./nextToken";

/**
 * Tokenizer converts a stream of characters into a stream of tokens.
 * Internally, it uses a buffer to store tokens that have been read.
 */
export class Tokenizer {
  private _context: TokenizerContext;
  private buffer: Token[];
  private offset: number;

  constructor(reader: CharStream) {
    this._context = {
      reader,
      isOperator: false,
      isLineStart: true,
      alphabets: [],
    };
    this.buffer = [];
    this.offset = 0;
  }

  public get context(): TokenizerContext {
    return this._context;
  }

  public consume(): Token {
    const token = this.peek();

    if (token == null) {
      throw new Error("Cannot consume past EOF");
    }

    this.offset++;

    if (this.buffer.length === this.offset) {
      this.offset = 0;
      this.buffer = [];
    }

    return token;
  }

  public peek(pos: number = 1): Token | null {
    const idx = pos + this.offset - 1;

    while (this.buffer.length <= idx) {
      const token = nextToken(this._context);
      if (token == null) {
        break;
      }
      this.buffer.push(token);
    }

    const token = this.buffer[idx];

    if (token == null) {
      return null;
    }

    return token;
  }

  public eof(pos: number = 1): boolean {
    return this.peek(pos) == null;
  }
}
