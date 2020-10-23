// // define the all keys as a const array
// // const EntityKeys = ["hero", "zombies", "bullets", "text"] as const;

// // derive a union type from that

// class Test<T> {
//   entities;
//   constructor(EntityKeys: T) {
//     type EntityKey = typeof EntityKeys[number];
//     this.entities = new Map<EntityKey, []>(EntityKeys.map((k) => [k, []]));
//   }
//   get() {
//     console.log(this.entities.get("bullets"));
//   }
// }

// const EntityKeys = ["hero", "zombies", "bullets", "text"] as const;

// const test = new Test(EntityKeys);

// test.get();
