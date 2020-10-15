import { DirectTowardsable } from "../components/DirectTowardsable";
import { addVectors, Vector2 } from "../helperFunctions";
import type { GameCanvas, VectorDrawable } from "../Canvas";
import type { PubSub } from "../EventObserver";

export class Bullet implements VectorDrawable {
  position;
  velocity;
  rotation;
  readonly fill = "black";
  readonly widthHeight: Vector2 = [15, 5];
  constructor(position: Vector2, velocity: Vector2, rotation: number) {
    this.position = position;
    this.velocity = velocity;
    this.rotation = rotation;
  }

  draw(gC: Readonly<GameCanvas>): void {
    gC.drawRectangle(this);
  }

  update(): void {
    // move in direction of rotation
    this.position = addVectors(this.position, [
      Math.sin(this.rotation * (Math.PI / 180)),
      Math.cos(this.rotation * (Math.PI / 180)),
    ]);
  }
}
