import { DirectTowardsable } from "../components/DirectTowardsable";
import type { Vector2 } from "../helperFunctions";
import type { GameCanvas, VectorDrawable } from "../Canvas";

export class Zombie implements VectorDrawable {
  position;
  target;
  velocity;
  fill = "green";
  rotation = 0;
  widthHeight: Vector2 = [15, 15];
  private readonly directTowards;

  constructor(position: Vector2, target: Vector2, velocity: Vector2) {
    this.position = position;
    this.target = target;
    this.velocity = velocity;
    this.directTowards = new DirectTowardsable(target, 1);
  }

  draw(gC: Readonly<GameCanvas>): void {
    gC.drawRectangle(this);
  }

  update(): void {
    this.directTowards.goTowardsTarget(this);
  }
}
