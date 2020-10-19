const testMap = new Map([
  ["x", [{ a: 999 }, { a: 111 }, { a: 300 }, { a: 120 }, { a: 130 }]],
  ["y", [{ a: 400 }, { a: 500 }, { a: 999 }, { a: 100 }, { a: 444 }]],
]);

let counter = 0;
function checkIfGroupsColliding(): void {
  const entitiesGroupOne = testMap.get("x");
  const entitiesGroupTwo = testMap.get("y");
  entitiesGroupOne?.some((entity, indexOne) =>
    entitiesGroupTwo?.some((entityTwo, indexTwo) => {
      counter += 1;
      if (entity.a === entityTwo.a) {
        console.log(`found match ${entity.a} ${entityTwo.a}`);
        return true; // return from some() when first match is found
      }
      return false;
    })
  );
}

type x = keyof typeof testMap;
checkIfGroupsColliding();
console.log(counter);
const x = typeof testMap.keys();
for (let key of testMap.keys()) {
  console.log(key);
}

const entityTypeValues = ["hero", "zombie"] as const;
type EntityType = typeof entityTypeValues[number];
