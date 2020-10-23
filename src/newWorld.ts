type Entity = { name: string };

/**
 * World holds on-screen entities and current game state
 *
 * Entities are in separate named arrays to simplify collision detection e.g.:
 *
 * Key: [{Entity}]
 * Key: [{Entity}, {Entity}]
 *
 * @param keysToCreateMap list of key names for entity groups to store
 */
class Test<Key> {
  private readonly entities;

  constructor(keysToCreateMap: Key[]) {
    this.entities = new Map<Key, Entity[]>(
      keysToCreateMap.map((key) => [key, []])
    );
  }

  getEntity = (key: Key, index: number) => this.entities.get(key)?.[index];

  getEntityGroup = (key: Key) => this.entities.get(key);

  pushEntity = (key: Key, entity: Entity) => {
    this.entities.get(key)?.push(entity);
  };

  deleteEntity(key: Key, index: number) {
    this.entities.get(key)?.splice(index, 1);
  }
}

const EntityKeys = ["hero", "zombies", "bullets", "text"] as const;
type EntityKey = typeof EntityKeys[number];

const test = new Test(EntityKeys.map((x) => x));

//
//
// TEST
//
//
// ????

test.pushEntity("bullets", { name: "a ha!" });
test.pushEntity("bullets", { name: "ho ho!" });
test.getEntityGroup("bullets"); // ?

console.log(test.getEntityGroup("bullets"));

//
//
// HOW
//
//
// ????
const b = EntityKeys.map((x) => x as EntityKey);
const v = EntityKeys;

console.log(b);
console.log(v);
