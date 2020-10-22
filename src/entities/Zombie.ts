import { DirectTowardsable } from "../components/DirectTowardsable";
import {
  calculateRandomPositionAroundPoint,
  Vector2,
} from "../helperFunctions";
import type { BitmapDrawable, GameCanvas } from "../GameCanvas";

export function loadImage(filePath: string): Promise<HTMLImageElement> {
  const imageElement = new Image();
  imageElement.src = filePath;
  return new Promise<HTMLImageElement>((resolve, reject) => {
    imageElement.onload = () => resolve(imageElement);
    imageElement.onerror = reject;
  });
}

export class Zombie implements BitmapDrawable {
  static imageCache: HTMLImageElement; // test if needed
  image: HTMLImageElement;
  position;
  velocity;
  fill = "green";
  rotation = 0;
  widthHeight;
  private readonly directTowards;

  constructor(
    position: Vector2,
    velocity: Vector2,
    image: HTMLImageElement,
    widthHeight: Vector2,
    directTowards: DirectTowardsable
  ) {
    this.image = image;
    this.position = position;
    this.velocity = velocity;
    this.directTowards = directTowards;
    this.widthHeight = widthHeight;
  }
  static async init(
    centrePoint: Vector2,
    screenWidthHeight: Vector2,
    target: Vector2,
    velocity: Vector2
  ): Promise<Zombie> {
    const [zombieImage] = await Promise.all([
      loadImage("assets/zombie64-final.png"),
    ]);

    return new Zombie(
      calculateRandomPositionAroundPoint(
        centrePoint, // TODO actual hero position!
        screenWidthHeight
      ),
      velocity,
      zombieImage,
      [zombieImage.width, zombieImage.height],
      new DirectTowardsable(target, 1)
    );
  }

  draw(gC: Readonly<GameCanvas>): void {
    gC.drawImage(this);
  }

  update(): void {
    this.directTowards.goTowardsTarget(this);
  }
}
