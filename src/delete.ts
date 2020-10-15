const testMap = new Map([
  ["x", [{ a: 100 }, { b: 200 }, { c: 300 }]],
  ["y", [{ a: 400 }, { b: 500 }, { c: 600 }]],
  ["z", [{ a: 700 }, { b: 800 }, { c: 900 }]],
]);

// use destructuring to get values of keys
let { x, y, z } = Object.fromEntries(testMap);
console.log(testMap.get("x")); // [ { a: 100 }, { b: 200 }, { c: 300 } ]

// use destructured value with array index and propety to get value (type check fails)
console.log(x[0].a); // 100 but Property 'a' does not exist on type 'number'.ts(2339)

const baboon = testMap.get("x")?.[0].a; //?
