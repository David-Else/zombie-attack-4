import { DirectTowardsable } from "../components/DirectTowardsable";
import type { Vector2 } from "../helperFunctions";
import type { GameCanvas, VectorDrawable } from "../Canvas";
import type { PubSub } from "../EventObserver";

export class Bullet implements VectorDrawable {
  position;
  velocity;
  rotation;
  readonly fill = "black";
  readonly widthHeight: Vector2 = [15, 5];
  readonly directTowards;
  constructor(
    position: Vector2,
    target: Vector2,
    velocity: Vector2,
    rotation: number
  ) {
    this.position = position;
    this.velocity = velocity;
    this.rotation = rotation;
    this.directTowards = new DirectTowardsable(target, 1);
  }

  // eslint-disable-next-line class-methods-use-this
  sayHello(message: string): void {
    console.log(`i am a bullet! ${message}`);
  }

  draw(gC: Readonly<GameCanvas>): void {
    gC.drawRectangle(this);
  }

  update(): void {
    this.directTowards.goTowardsTarget(this);
  }
}
