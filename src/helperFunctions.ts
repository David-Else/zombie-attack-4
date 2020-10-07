export type Vector2 = [number, number];

export function createMultiple<T>(
  numberOfClasses: number,
  factory: () => T
): T[] {
  return Array.from({ length: numberOfClasses }, factory);
}

export function addVectors(
  a: Readonly<Vector2>,
  b: Readonly<Vector2>
): Vector2 {
  return [a[0] + b[0], a[1] + b[1]];
}
