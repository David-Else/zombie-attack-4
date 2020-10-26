import type { Entity } from "./newWorld";

export type Vector2 = [x: number, y: number];

export const createMultiple = <T>(
  numberOfClasses: number,
  factory: () => T
): T[] => Array.from({ length: numberOfClasses }, factory);

type VectorFn = (x: Readonly<Vector2>, y: Readonly<Vector2>) => Vector2;

export const addVectors: VectorFn = (x, y) => [x[0] + y[0], x[1] + y[1]];

export const divideVectors: VectorFn = (x, y) => [x[0] / y[0], x[1] / y[1]];

export const calculateCenter = (entity: Readonly<Entity>): Vector2 =>
  addVectors(entity.position, divideVectors(entity.widthHeight, [2, 2]));

export const calculateRandomPositionAroundPoint: VectorFn = (
  centrePoint,
  screenWidthHeight
) => {
  const variationInR = 1;
  const minimumR = screenWidthHeight[1] / 2; // TODO add size of entity make always on screen
  const theta = Math.random() * (2 * Math.PI);
  const r = Math.random() * variationInR + minimumR;
  return [
    Math.cos(theta) * r + centrePoint[0],
    Math.sin(theta) * r + centrePoint[1],
  ];
};

export const moveForward = (
  position: Readonly<Vector2>,
  rotation: Readonly<number>
): Vector2 =>
  addVectors(position, [
    Math.sin(rotation * (Math.PI / 180)),
    Math.cos(rotation * (Math.PI / 180)),
  ]);
