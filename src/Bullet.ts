import { DirectTowardsable } from "./components/DirectTowardsable";
import type { Vector2 } from "./helperFunctions";
import type { GameCanvas, VectorDrawable } from "./Canvas";

export class Bullet implements VectorDrawable {
  position;
  target;
  velocity;
  rotation;
  readonly fill;
  readonly widthHeight;
  readonly directTowards;
  constructor(
    position: Vector2,
    target: Vector2,
    velocity: Vector2 = [0, 0],
    rotation = 33,
    fill = "black",
    widthHeight: Vector2 = [15, 5]
  ) {
    this.position = position;
    this.target = target;
    this.velocity = velocity;
    this.rotation = rotation;
    this.fill = fill;
    this.widthHeight = widthHeight;
    this.directTowards = new DirectTowardsable(target, 1); // in constructor!
  }

  draw(gC: Readonly<GameCanvas>): void {
    gC.drawRectangle(this);
  }

  update(): void {
    this.directTowards.goTowardsTarget(this);
  }
}
