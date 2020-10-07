import type { TextDrawable } from "./Canvas";
import type { Vector2 } from "./helperFunctions";
import { Hero } from "./entities/Hero";
import { Zombie } from "./entities/Zombie";
import { Texty } from "./entities/Text";
import { Bullet } from "./entities/Bullet";

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
export function heroFactory(position: Vector2): Hero {
  return new Hero(position);
}

export function bulletFactory(position: Vector2): Bullet {
  return new Bullet(position, [0, 0], [0, 0], 1);
}

export function zombieFactory(
  centrePoint: Vector2,
  screenWidthHeight: Vector2,
  target: Vector2,
  velocity: Vector2
): Zombie {
  const zombie = new Zombie(
    calculateRandomPositionAroundPoint(
      centrePoint, // TODO actual hero position!
      screenWidthHeight
    ),
    target,
    velocity
  );
  // perform async zombie setup needed after instantiation
  return zombie;
}

export function textFactory(textObj: Omit<TextDrawable, "draw">): Texty {
  return new Texty(textObj);
}
