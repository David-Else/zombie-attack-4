import { createMultiple, Vector2 } from "./helperFunctions";
import {
  heroFactory,
  zombieFactory,
  bulletFactory,
  textFactory,
} from "./factories";
import type { GameCanvas } from "./Canvas";

type EntityKeys = "hero" | "zombies" | "bullets" | "text";

interface Entity {
  update: () => void;
  draw: (gC: Readonly<GameCanvas>) => void;
}

interface Collidable {
  position: Vector2;
  widthHeight: Vector2;
}

/**
 * =============================================================================
 * Axis-aligned bounding boxes, test if two game entities are overlapping or not
 * =============================================================================
 */
export function checkCollision(
  entity1: Collidable,
  entity2: Collidable
): boolean {
  const left = entity1.position[0];
  const right = entity1.position[0] + entity1.widthHeight[0];
  const top = entity1.position[1];
  const bottom = entity1.position[1] + entity1.widthHeight[1];

  const otherLeft = entity2.position[0];
  const otherRight = entity2.position[0] + entity2.widthHeight[0];
  const otherTop = entity2.position[1];
  const otherBottom = entity2.position[1] + entity2.widthHeight[1];

  return !(
    left > otherRight ||
    right <= otherLeft ||
    top >= otherBottom ||
    bottom <= otherTop
  );
}

export class World {
  entities;

  constructor(
    gameCanvas: Readonly<GameCanvas>,
    options: { numberOfZombies: number }
  ) {
    this.entities = new Map<EntityKeys, Entity[]>([
      ["hero", createMultiple(1, () => heroFactory(gameCanvas.getMiddle()))],
      [
        "zombies",
        createMultiple(options.numberOfZombies, () =>
          zombieFactory(
            gameCanvas.getMiddle(),
            gameCanvas.getWidthHeight(),
            gameCanvas.getMiddle(), // TODO SHOULD be hero.position somehow
            [0, 0]
          )
        ),
      ],
      [
        "bullets",
        createMultiple(1, () => bulletFactory(gameCanvas.getMiddle())),
      ],
      [
        "text",
        createMultiple(1, () =>
          textFactory({
            position: [190, 50],
            velocity: [0, 0],
            rotation: 0,
            text: `Score:
    Bullets left:`,
            textAlignment: "right",
            fillStyle: "serif",
            font: "serif",
            fontSize: 32,
          })
        ),
      ],
    ]);
  }

  checkIfGroupsColliding = (
    entitiesGroupOne: Entity[],
    entitiesGroupTwo: Entity[],
    collisionHandler: (indexOne: number, indexTwo: number) => void
  ): void => {
    entitiesGroupOne.forEach((entity, indexOne) =>
      entitiesGroupTwo.forEach((entityTwo, indexTwo) => {
        // console.log(`entity ${JSON.stringify(entity)}`);
        // console.log(indexTwo);
        if (checkCollision(entity, entityTwo)) {
          collisionHandler(indexOne, indexTwo);
        }
      })
    );
  };

  zombieBulletCollisionHandler = (index: number, index2: number): void => {
    let zombies = this.entities.get("zombies");
    let bullets = this.entities.get("bullets");
    console.log(`zombie hit!!!! ${index} ${index2}`);
    zombies?.splice(index, 1);
    bullets?.splice(index2, 1);
  };

  heroZombieCollisionHandler = (index: number, index2: number): void => {
    let zombies = this.entities.get("zombies");
    let hero = this.entities.get("hero");
    console.log(`hero hit!!!! ${index} ${index2}`);
    hero?.splice(index, 1);
    // lives -1
  };

  // eslint-disable-next-line class-methods-use-this
  checkCollision(): void {
    this.checkIfGroupsColliding(
      this.entities.get("zombies") as Entity[],
      this.entities.get("bullets") as Entity[],
      this.zombieBulletCollisionHandler
    );
    this.checkIfGroupsColliding(
      this.entities.get("hero") as Entity[],
      this.entities.get("zombies") as Entity[],
      this.heroZombieCollisionHandler
    );
  }
}
