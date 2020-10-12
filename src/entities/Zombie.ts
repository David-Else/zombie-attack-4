import { DirectTowardsable } from "../components/DirectTowardsable";
import type { Vector2 } from "../helperFunctions";
import type { BitmapDrawable, GameCanvas } from "../Canvas";

export class Zombie implements BitmapDrawable {
  image: HTMLImageElement;
  position;
  target;
  velocity;
  fill = "green";
  rotation = 0;
  widthHeight;
  private readonly directTowards;

  constructor(
    position: Vector2,
    target: Vector2,
    velocity: Vector2,
    image: HTMLImageElement,
    widthHeight: Vector2
  ) {
    this.image = image;
    this.position = position;
    this.target = target;
    this.velocity = velocity;
    this.directTowards = new DirectTowardsable(target, 1);
    this.widthHeight = widthHeight;
  }

  draw(gC: Readonly<GameCanvas>): void {
    gC.drawImage(this);
  }

  update(): void {
    this.directTowards.goTowardsTarget(this);
  }
}
