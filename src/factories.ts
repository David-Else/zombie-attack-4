import type { TextDrawable } from "./Canvas";
import type { Vector2 } from "./helperFunctions";
import { Hero } from "./Hero";
import { Zombie } from "./Zombie";
import { Texty } from "./Text";
import { Bullet } from "./Bullet";
import { gameCanvas } from "./index";

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

export function bulletFactory(): Bullet {
  const bullet = new Bullet(gameCanvas.getMiddle(), [0, 0]);
  return bullet;
}

export function zombieFactory(): Zombie {
  const zombie = new Zombie(
    calculateRandomPositionAroundPoint(
      [100, 100], // TODO actual hero position!
      gameCanvas.getWidthHeight()
    ),
    gameCanvas.getMiddle()
  );
  // perform zombie setup needed after instantiation
  // add images
  return zombie;
}

export function textFactory(textObj: Omit<TextDrawable, "draw">): Texty {
  return new Texty(textObj);
}
