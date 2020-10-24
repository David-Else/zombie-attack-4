import type { GameCanvas } from "./GameCanvas";
import type { Vector2 } from "./helperFunctions";

export interface Entity {
  position: Vector2;
  velocity: Vector2;
  widthHeight: Vector2;
  rotation: number;
  update: () => void;
  draw: (gC: Readonly<GameCanvas>) => void;
}

/**
 * World holds on-screen entities and current game state
 * Entities are in separate named arrays to simplify collision detection e.g.:
 *
 * Key: [{Entity}]
 * Key: [{Entity}, {Entity}]
 */
export class NewWorld<Key> {
  level = 1;
  private readonly entities;

  constructor(entityGroupNames: Key[]) {
    this.entities = new Map<Key, Entity[]>(
      entityGroupNames.map((key) => [key, []])
    );
  }

  getAllEntities(): Entity[] {
    const result: Entity[] = [];

    this.entities.forEach((group) => {
      group.forEach((entity) => {
        result.push(entity);
      });
    });
    return result;
  }
  getEntityGroup = (key: Key): Entity[] | undefined => this.entities.get(key);
  getEntity = (key: Key, index: number): Entity | undefined =>
    this.entities.get(key)?.[index];
  pushEntity = (key: Key, entity: Entity): void => {
    this.entities.get(key)?.push(entity);
  };
  deleteEntity(key: Key, index: number): void {
    this.entities.get(key)?.splice(index, 1);
  }
}
