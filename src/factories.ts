import type { TextObject } from "./GameCanvas";
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

type ZombieFactory = (
  centrePoint: Vector2,
  screenWidthHeight: Vector2,
  target: Vector2,
  velocity: Vector2,
  image: HTMLImageElement
) => Zombie;

export const zombieFactory: ZombieFactory = (
  centrePoint,
  screenWidthHeight,
  target,
  velocity,
  image
) => {
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
};

export interface TextFactory extends TextObject {
  position: Vector2;
  velocity: Vector2;
  rotation: number;
  widthHeight: Vector2;
}

export const textFactory = (textObj: TextFactory): Texty => new Texty(textObj);
