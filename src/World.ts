import { calculateCenter, createMultiple, Vector2 } from "./helperFunctions";
import {
  heroFactory,
  zombieFactory,
  bulletFactory,
  textFactory,
} from "./factories";
import type { GameCanvas } from "./GameCanvas";
import { PubSub } from "./EventObserver";

type EntityKeys = "hero" | "zombies" | "bullets" | "text";

export interface Entity {
  position: Vector2;
  velocity: Vector2;
  widthHeight: Vector2;
  rotation: number;
  update: () => void;
  draw: (gC: Readonly<GameCanvas>) => void;
}

/**
 * =============================================================================
 * Axis-aligned bounding boxes, test if two game entities are overlapping or not
 * =============================================================================
 */
function checkCollision(entity1: Entity, entity2: Entity): boolean {
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
  zombieDiesPubSub;

  constructor(
    gameCanvas: Readonly<GameCanvas>,
    options: { numberOfZombies: number; zombieImage: HTMLImageElement }
  ) {
    // Create PubSub event buses, they will be injected into entities that need them
    this.bulletFiredPubSub = new PubSub<string>();
    this.zombieDiesPubSub = new PubSub<string>();
    // Subscribe to any that need access to World scope
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

  getEntity(entityKey: EntityKeys, index: number): Entity {
    return this.entities.get(entityKey)?.[index];
  }

  addBullet(): void {
    const hero = this.entities.get("hero"); // get possible undefined?
    this.entities.get("bullets")?.push(
      bulletFactory({
        position: calculateCenter(hero?.[0]),
        rotation: hero?.[0].rotation,
      })
    );
  }

  deleteEntity(entity: EntityKeys, index: number): void {
    this.entities.get(entity)?.splice(index, 1);
  }

  checkCollision(): void {
    this.checkIfGroupsColliding(
      this.entities.get("zombies"), // WHY?
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
    entitiesGroupOne.some((entity, indexOne) =>
      entitiesGroupTwo.some((entityTwo, indexTwo) => {
        if (checkCollision(entity, entityTwo)) {
          collisionHandler(indexOne, indexTwo);
          return true; // return from some() when first match is found
        }
        return false;
      })
    );
  };

  private readonly zombieBulletCollisionHandler = (
    zombieIndex: number,
    heroIndex: number
  ): void => {
    this.deleteEntity("zombies", zombieIndex);
    this.deleteEntity("bullets", heroIndex);
  };

  private readonly heroZombieCollisionHandler = (heroIndex: number): void => {
    this.deleteEntity("hero", heroIndex);
  };
}
