export type Vector2 = [number, number];

export const createMultiple = <T>(
  numberOfClasses: number,
  factory: () => T
): T[] => Array.from({ length: numberOfClasses }, factory);

type VectorFn = (a: Readonly<Vector2>, b: Readonly<Vector2>) => Vector2;
export const addVectors: VectorFn = (a, b) => [a[0] + b[0], a[1] + b[1]];
export const divideVectors: VectorFn = (a, b) => [a[0] / b[0], a[1] / b[1]];

export const moveForward = (
  position: Readonly<Vector2>,
  rotation: Readonly<number>
): Vector2 =>
  addVectors(position, [
    Math.sin(rotation * (Math.PI / 180)),
    Math.cos(rotation * (Math.PI / 180)),
  ]);
