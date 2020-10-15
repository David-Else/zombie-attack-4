import { createMultiple, Vector2 } from "./helperFunctions";
import {
  heroFactory,
  zombieFactory,
  bulletFactory,
  textFactory,
} from "./factories";
import type { GameCanvas } from "./Canvas";
import { PubSub } from "./EventObserver";

type EntityKeys = "hero" | "zombies" | "bullets" | "text";

interface Entity {
  position: Vector2;
  widthHeight: Vector2;
  update: () => void;
  draw: (gC: Readonly<GameCanvas>) => void;
}

/**
 * =============================================================================
 * Axis-aligned bounding boxes, test if two game entities are overlapping or not
 * =============================================================================
 */
export function checkCollision(entity1: Entity, entity2: Entity): boolean {
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
  bulletFiredPubSub;

  constructor(
    gameCanvas: Readonly<GameCanvas>,
    options: { numberOfZombies: number; zombieImage: HTMLImageElement }
  ) {
    this.bulletFiredPubSub = new PubSub<string>();
    this.bulletFiredPubSub.subscribe(() => this.addBullet());
    this.entities = new Map<EntityKeys, Entity[]>([
      [
        "hero",
        createMultiple(1, () =>
          heroFactory(gameCanvas.getMiddle(), this.bulletFiredPubSub)
        ),
      ],
      [
        "zombies",
        createMultiple(options.numberOfZombies, () =>
          zombieFactory(
            gameCanvas.getMiddle(),
            gameCanvas.getWidthHeight(),
            gameCanvas.getMiddle(), // TODO SHOULD be hero.position somehow
            [0, 0],
            options.zombieImage
          )
        ),
      ],
      ["bullets", []],
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
            widthHeight: [0, 100],
          })
        ),
      ],
    ]);
  }

  // createEntity(entityKey: EntityKeys): void {
  //   const entity1 = this.entities.get(entityKey);
  //   // ah ha!
  // }

  getEntity(entityKey: EntityKeys, index: number): Entity {
    const entityValue = this.entities.get(entityKey);
    return entityValue[index];
  }

  addBullet(): void {
    const entityValue = this.entities.get("bullets");
    const hero = this.entities.get("hero");
    if (typeof hero[0] !== "undefined") {
      entityValue?.push(bulletFactory(hero[0].position, hero[0].rotation));
    }
  }

  deleteEntity(entity: EntityKeys, index: number): void {
    const entityToDelete = this.entities.get(entity);
    entityToDelete?.splice(index, 1);
  }

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

  private readonly checkIfGroupsColliding = (
    entitiesGroupOne: Entity[],
    entitiesGroupTwo: Entity[],
    collisionHandler: (indexOne: number, indexTwo: number) => void
  ): void => {
    entitiesGroupOne.forEach((entity, indexOne) =>
      entitiesGroupTwo.forEach((entityTwo, indexTwo) => {
        if (checkCollision(entity, entityTwo)) {
          collisionHandler(indexOne, indexTwo);
        }
      })
    );
  };

  /**
   * Collision handlers are executed when two entities colide
   *
   * @param index position of the entity in the array to act on
   * @param index2 position of the entity in the second array to act on
   */
  private readonly zombieBulletCollisionHandler = (
    index: number,
    index2: number
  ): void => {
    this.deleteEntity("zombies", index);
    this.deleteEntity("bullets", index2);
  };

  private readonly heroZombieCollisionHandler = (index: number): void => {
    this.deleteEntity("hero", index);
  };
}
