import type { TextDrawable } from "./GameCanvas";
import type { Vector2 } from "./helperFunctions";
import { Hero } from "./entities/Hero";
import { Zombie } from "./entities/Zombie";
import { Texty } from "./entities/Text";
import { Bullet } from "./entities/Bullet";
import type { PubSub } from "./EventObserver";

function calculateRandomPositionAroundPoint(
  centrePoint: Readonly<Vector2>,
  screenWidthHeight: Readonly<Vector2>
): Vector2 {
  const variationInR = 1;
  const minimumR = screenWidthHeight[1] / 2; // TODO add size of entity make always on screen
  const theta = Math.random() * (2 * Math.PI);
  const r = Math.random() * variationInR + minimumR;
  return [
    Math.cos(theta) * r + centrePoint[0],
    Math.sin(theta) * r + centrePoint[1],
  ];
}

/**
 * Factories for entities
 */
export function heroFactory(
  position: Vector2,
  bulletFiredPubSub: PubSub<string>
): Hero {
  return new Hero(position, bulletFiredPubSub);
}

export function bulletFactory(position: Vector2, rotation: number): Bullet {
  return new Bullet(position, [0, 0], rotation);
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
