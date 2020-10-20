import type { Vector2 } from "./helperFunctions";
import type { Entity } from "./World";

export interface VectorDrawable extends Entity {
  readonly fill: string;
}
export interface BitmapDrawable extends Entity {
  readonly image: HTMLImageElement;
}

// export interface TextObject {
//   readonly text: string;
//   readonly textAlignment: CanvasTextAlign;
//   readonly fillStyle: CanvasFillStrokeStyles["fillStyle"];
//   readonly font: CanvasTextDrawingStyles["font"];
//   readonly fontSize: number;
// }

export interface TextDrawable extends Entity {
  readonly text: string;
  readonly textAlignment: CanvasTextAlign;
  readonly fillStyle: CanvasFillStrokeStyles["fillStyle"];
  readonly font: CanvasTextDrawingStyles["font"];
  readonly fontSize: number;
}

/**
 * Encapsulate the browser canvas context and add domain specific methods
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
  drawRectangle(entity: VectorDrawable): void {
    this.ctx.fillText(
      `x:${Math.ceil(entity.position[0])} y:${Math.ceil(entity.position[1])} `,
      entity.position[0],
      entity.position[1]
    );
    // first save the untranslated/unrotated context
    this.ctx.save();
    this.ctx.beginPath();
    // move the rotation point to the center of the rect
    this.ctx.translate(
      entity.position[0] + entity.widthHeight[0] / 2,
      entity.position[1] + entity.widthHeight[1] / 2
    );
    // rotate the rect
    this.ctx.rotate(entity.rotation * (Math.PI / 180));
    // draw the rect on the transformed context
    this.ctx.fillStyle = entity.fill;
    this.ctx.fillRect(
      entity.widthHeight[0] / -2,
      entity.widthHeight[1] / -2,
      entity.widthHeight[0],
      entity.widthHeight[1]
    );
    // restore the context to its untranslated/unrotated state
    this.ctx.restore();
  }
  drawImage(entity: BitmapDrawable): void {
    this.ctx.drawImage(entity.image, entity.position[0], entity.position[1]);
  }
  drawText(entity: TextDrawable): void {
    const linesOfText = entity.text.split("\n");
    this.ctx.save();
    this.ctx.font = `${entity.fontSize}px ${entity.font}`;
    this.ctx.fillStyle = entity.fillStyle;
    this.ctx.textAlign = entity.textAlignment;
    this.ctx.translate(entity.position[0], entity.position[1]);
    this.ctx.rotate((entity.rotation * Math.PI) / 180);
    linesOfText.forEach((line: string, index: number) =>
      this.ctx.fillText(line, 0, index * entity.fontSize)
    );
    this.ctx.restore();
  }
}
