import { moveForward } from "../helperFunctions";
import type { Vector2 } from "../helperFunctions";
import type { GameCanvas, VectorDrawable } from "../GameCanvas";

export class Bullet implements VectorDrawable {
  position;
  velocity;
  rotation;
  readonly fillStyle = "black";
  readonly widthHeight: Vector2 = [5, 15];
  constructor({
    position,
    velocity,
    rotation,
  }: {
    position: Vector2;
    velocity: Vector2;
    rotation: number;
  }) {
    this.position = position;
    this.velocity = velocity;
    this.rotation = rotation;
  }

  draw(gC: Readonly<GameCanvas>): void {
    gC.drawRectangle(this);
  }

  update(): void {
    this.position = moveForward(this.position, this.rotation);
  }
}
