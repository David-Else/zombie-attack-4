/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import type { Entity, NewWorld } from "./newWorld";

// these need to be imported or send via a generic
const EntityKeys = ["hero", "zombies", "bullets", "text"] as const;
type EntityKey = typeof EntityKeys[number];

/**
 * Check collision between different groups to save CPU of checking all entities
 */
export function checkCollision(world: NewWorld<EntityKey>): void {
  checkIfGroupsColliding(
    world.getEntityGroup("zombies"), // maybe add what checks what in data in enteties?!
    world.getEntityGroup("bullets"),
    zombieBulletCollisionHandler,
    world
  );
  checkIfGroupsColliding(
    world.getEntityGroup("hero"),
    world.getEntityGroup("zombies"),
    heroZombieCollisionHandler,
    world
  );
}

/**
 * Axis-aligned bounding boxes, test if two game entities are overlapping or not
 */
function checkCollisions(entity1: Entity, entity2: Entity): boolean {
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

function checkIfGroupsColliding(
  entitiesGroupOne: Entity[] | undefined,
  entitiesGroupTwo: Entity[] | undefined,
  collisionHandler: (
    indexOne: number,
    indexTwo: number,
    world: NewWorld<EntityKey>
  ) => void,
  world: NewWorld<EntityKey>
): void {
  entitiesGroupOne?.some((entity, indexOne) =>
    entitiesGroupTwo?.some((entityTwo, indexTwo) => {
      if (checkCollisions(entity, entityTwo)) {
        collisionHandler(indexOne, indexTwo, world);
        return true; // return from some() when first match is found
      }
      return false;
    })
  );
}

function zombieBulletCollisionHandler(
  zombieIndex: number,
  heroIndex: number,
  world: NewWorld<EntityKey>
): void {
  world.deleteEntity("zombies", zombieIndex);
  world.deleteEntity("bullets", heroIndex);
}

function heroZombieCollisionHandler(
  heroIndex: number,
  zombieIndex: number, // problem, destructure, generics?
  world: NewWorld<EntityKey>
): void {
  world.deleteEntity("hero", heroIndex);
}
