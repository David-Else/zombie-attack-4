// what I want is [ [{},{},{}],[{},{},{}}] ]

let recipeMap = new Map([[], [], []]);

recipeMap
  .set("items", [
    {
      x: 1,
      update() {
        console.log("hello from 1");
      },
    },
    { x: 2 },
    { x: 3 },
  ])
  .set("baboon", { x: 3 });

recipeMap.forEach((value, key) => {
  console.log(`KEY: ${key}: VALUE: ${value}`); // cucumber: 500 etc
});

Object.entries(recipeMap).forEach(([key, value]) => value[0].update());

console.log(recipeMap);

console.log(Array.from(recipeMap));

let john = { name: "John Doe" },
  lily = { name: "Lily Bush" },
  peter = { name: "Peter Drucker" };

let userRoles = new Map([
  [
    "ape",
    [
      { namey: "John Doe1", age: 12 },
      { namey: "John Doe2", age: 13 },
    ],
  ],
  ["dog", [{ name2: "John Doe" }]],
]);

for (let [user, role] of userRoles.entries()) {
  console.log(`${user}: ${role.name}`);
}

const [namey] = userRoles.get("ape"); //?
namey;
// example object
var obj = { a: 1, b: 2, c: "something" };

// caching map
var objMap = new Map(Object.entries(obj));

// fast iteration on Map object
objMap.forEach((item, key) => {
  // do something with an item
  console.log(key, item);
});
