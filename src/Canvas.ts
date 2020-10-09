import type { Vector2 } from "./helperFunctions";

export interface Drawable {
  position: Vector2;
  velocity: Vector2;
  rotation: number;
  draw: (gC: Readonly<GameCanvas>) => void;
}
export interface VectorDrawable extends Drawable {
  widthHeight: Vector2;
  readonly fill: string;
}
export interface BitmapDrawable extends Drawable {
  readonly image: HTMLImageElement;
}

export interface TextDrawable extends Drawable {
  readonly text: string;
  readonly textAlignment: CanvasTextAlign;
  readonly fillStyle: string;
  readonly font: string;
  readonly fontSize: number;
  readonly widthHeight: Vector2;
}
/**
 * Canvas
 *
 * Encapsulate the browser canvas context and add methods that use it
 */
export class GameCanvas {
  private ctx;

  constructor(element: unknown, widthHeight: Readonly<Vector2>) {
    if (element instanceof HTMLCanvasElement) {
      const canvas = element;
      [canvas.width, canvas.height] = widthHeight;
      this.ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    } else {
      throw new TypeError(
        `${String(element)} is not an instance of HTMLCanvasElement`
      );
    }
  }
  clearScreen(): void {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }
  getWidthHeight(): Vector2 {
    return [this.ctx.canvas.width, this.ctx.canvas.height];
  }
  getMiddle(): Vector2 {
    return [this.ctx.canvas.width / 2, this.ctx.canvas.height / 2];
  }
  drawRectangle(vectorImage: VectorDrawable): void {
    this.ctx.fillText(
      `x:${Math.ceil(vectorImage.position[0])} y:${Math.ceil(
        vectorImage.position[1]
      )} `,
      vectorImage.position[0],
      vectorImage.position[1]
    );
    // first save the untranslated/unrotated context
    this.ctx.save();
    this.ctx.beginPath();
    // move the rotation point to the center of the rect
    this.ctx.translate(
      vectorImage.position[0] + vectorImage.widthHeight[0] / 2,
      vectorImage.position[1] + vectorImage.widthHeight[1] / 2
    );
    // rotate the rect
    this.ctx.rotate(vectorImage.rotation * (Math.PI / 180));
    // draw the rect on the transformed context
    this.ctx.fillStyle = vectorImage.fill;
    this.ctx.fillRect(
      vectorImage.widthHeight[0] / -2,
      vectorImage.widthHeight[1] / -2,
      vectorImage.widthHeight[0],
      vectorImage.widthHeight[1]
    );
    // restore the context to its untranslated/unrotated state
    this.ctx.restore();
  }
  drawImage(bitmapImage: BitmapDrawable): void {
    this.ctx.drawImage(
      bitmapImage.image,
      bitmapImage.position[0],
      bitmapImage.position[1]
    );
  }
  // ?? is this optimal
  drawText(textObj: TextDrawable): void {
    const linesOfText = textObj.text.split("\n");
    this.ctx.save();
    this.ctx.font = `${textObj.fontSize}px ${textObj.font}`;
    this.ctx.fillStyle = textObj.fillStyle;
    this.ctx.textAlign = textObj.textAlignment;
    this.ctx.translate(textObj.position[0], textObj.position[1]);
    this.ctx.rotate((textObj.rotation * Math.PI) / 180);
    linesOfText.forEach((line: string, index: number) =>
      this.ctx.fillText(line, 0, index * textObj.fontSize)
    );
    this.ctx.restore();
  }
}
