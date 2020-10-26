// import { calculateRandomPositionAroundPoint } from "./helperFunctions";
import { Hero } from "./entities/Hero";
import { Zombie } from "./entities/Zombie";
import { Texty } from "./entities/Text";
import { Bullet } from "./entities/Bullet";
import type { PubSub } from "./EventObserver";
import type { TextDrawable } from "./GameCanvas";
import { divideVectors, Vector2 } from "./helperFunctions";
import levelData from "./levelData.json"; // snowpack creates proxy file
import { KeyboardInputable } from "./components/KeyboardInputable";
import { DirectTowardsable } from "./components/DirectTowardsable";

export class GameEntityFactory {
  public static getHero(
    level: Readonly<number>,
    screenCenter: Vector2,
    bulletFiredPubSub: PubSub<string>
  ): Hero {
    return new Hero(screenCenter, new KeyboardInputable(), bulletFiredPubSub);
  }

  public static getZombie(level: number) {
    // load zombie image caching for multiple zombies, do this on class?
  }

  public static getBullet() {}

  public static getOnScreenText(textBox: {
    variableName: string;
    variable: number;
  }) {
    // we need to send variables for score, bullets left, + other variables in future?
  }
}

export function heroFactory(
  position: Vector2,
  bulletFiredPubSub: PubSub<string>
): Hero {
  return new Hero(position, new KeyboardInputable(), bulletFiredPubSub);
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
  screenWidthHeight: Vector2,
  target: Vector2,
  velocity: Vector2
) => Zombie; // aaargggh what is a Promise<Zombie>

export const zombieFactory = async (
  screenWidthHeight: Vector2,
  target: Vector2,
  velocity: Vector2
): Promise<Zombie> => {
  // const zombie = new Zombie(
  //   calculateRandomPositionAroundPoint(
  //     centrePoint, // TODO actual hero position!
  //     screenWidthHeight
  //   ),
  //   velocity,
  //   image,
  //   [image.width, image.height],
  //   new DirectTowardsable(target, 1)
  // );
  const zombie = await Zombie.init(
    divideVectors(screenWidthHeight, [2, 2]),
    screenWidthHeight,
    target,
    velocity
  );
  return zombie;
};

// export type TextFactory = Omit<TextDrawable, "update" | "draw" | "text">;

export const levelTextFactory = (text: string): Texty =>
  new Texty(text, {
    position: [190, 50],
    velocity: [0, 0],
    rotation: 0,
    textAlignment: "right",
    fillStyle: "serif",
    font: "serif",
    fontSize: 32,
    widthHeight: [0, 100],
  });
