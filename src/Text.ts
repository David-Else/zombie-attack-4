import type { GameCanvas, TextDrawable } from "./Canvas";

export class Texty implements TextDrawable {
  position;
  velocity;
  text;
  textAlignment;
  fillStyle;
  rotation;
  font;
  fontSize;

  constructor(text: Omit<TextDrawable, "draw">) {
    this.position = text.position;
    this.velocity = text.velocity;
    this.text = text.text;
    this.textAlignment = text.textAlignment;
    this.fillStyle = text.fillStyle;
    this.rotation = text.rotation;
    this.font = text.font;
    this.fontSize = text.fontSize;
  }

  draw(gC: Readonly<GameCanvas>): void {
    gC.drawText(this);
  }

  update(): void {
    this.rotation += 1;
  }
}
