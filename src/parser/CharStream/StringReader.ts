import { defaultPos, updatePos, type Pos } from "./Pos";
import type { CharStream } from "./CharStream";

/**
 * A CharStream implementation that reads from a string.
 */
export class StringReader implements CharStream {
  private source: string;
  private pos: Pos;

  constructor(source: string) {
    this.source = source;
    this.pos = defaultPos();
  }

  public position(): Pos {
    return { ...this.pos };
  }

  public peek(pos: number = 1): number {
    if (pos < 1) throw new Error("Cannot peek backwards");
    if (this.eof(pos)) return -1;

    return this.source.charCodeAt(this.pos.overall + pos);
  }

  public consume(): number {
    const char = this.peek();
    if (char === -1) throw new Error("Cannot read past EOF");
    updatePos(this.pos, char, this);
    return char;
  }

  public eof(pos: number = 1): boolean {
    return this.pos.overall >= this.source.length - pos;
  }
}
