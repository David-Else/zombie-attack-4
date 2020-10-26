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

  constructor(text: string, textObj: TextFactory) {
    this.text = text;
    this.position = textObj.position;
    this.velocity = textObj.velocity;
    this.textAlignment = textObj.textAlignment;
    this.fillStyle = textObj.fillStyle;
    this.rotation = textObj.rotation;
    this.font = textObj.font;
    this.fontSize = textObj.fontSize;
    this.widthHeight = textObj.widthHeight;
  }

  draw(gC: Readonly<GameCanvas>): void {
    gC.drawText(this);
  }

  update(): void {}
}
