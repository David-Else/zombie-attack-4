import type { TextFactory } from "../factories";
import type { GameCanvas, TextDrawable } from "../GameCanvas";

export class Texty implements TextDrawable {
  position;
  velocity;
  text;
  textAlignment;
  fillStyle;
  rotation;
  font;
  fontSize;
  widthHeight;

  constructor(text: TextFactory) {
    this.position = text.position;
    this.velocity = text.velocity;
    this.text = text.text;
    this.textAlignment = text.textAlignment;
    this.fillStyle = text.fillStyle;
    this.rotation = text.rotation;
    this.font = text.font;
    this.fontSize = text.fontSize;
    this.widthHeight = text.widthHeight;
  }

  draw(gC: Readonly<GameCanvas>): void {
    gC.drawText(this);
  }

  update(): void {}
}
