import type { TextDrawable } from "./GameCanvas";
import { calculateRandomPositionAroundPoint, Vector2 } from "./helperFunctions";
import { Hero } from "./entities/Hero";
import { Zombie } from "./entities/Zombie";
import { Texty } from "./entities/Text";
import { Bullet } from "./entities/Bullet";
import type { PubSub } from "./EventObserver";

export function heroFactory(
  position: Vector2,
  bulletFiredPubSub: PubSub<string>
): Hero {
  return new Hero(position, bulletFiredPubSub);
}

export function bulletFactory({
  position,
  rotation,
}: {
  position: Vector2;
  rotation: number;
}): Bullet {
  return new Bullet({ position, velocity: [0, 0], rotation });
}

export function zombieFactory(
  centrePoint: Vector2,
  screenWidthHeight: Vector2,
  target: Vector2,
  velocity: Vector2,
  image: HTMLImageElement
): Zombie {
  const zombie = new Zombie(
    calculateRandomPositionAroundPoint(
      centrePoint, // TODO actual hero position!
      screenWidthHeight
    ),
    target,
    velocity,
    image,
    [image.width, image.height]
  );
  return zombie;
}

export function textFactory(textObj: Omit<TextDrawable, "draw">): Texty {
  return new Texty(textObj);
}
