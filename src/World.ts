import { createMultipleInstantiatedClasses } from "./helperFunctions";
import {
  heroFactory,
  zombieFactory,
  bulletFactory,
  textFactory,
} from "./factories";
import type { GameCanvas } from "./Canvas";

interface Updateable {
  update: () => void;
  draw: (gC: Readonly<GameCanvas>) => void;
}

export class World {
  entities;

  constructor(gameCanvas: GameCanvas) {
    this.entities = new Map<string, Updateable[]>();
    this.entities
      .set(
        "hero",
        createMultipleInstantiatedClasses(1, () =>
          heroFactory(gameCanvas.getMiddle())
        )
      )
      .set(
        "zombies",
        createMultipleInstantiatedClasses(44, () =>
          zombieFactory(
            gameCanvas.getMiddle(),
            gameCanvas.getWidthHeight(),
            // Object.fromEntries(this.entities.entries()),
            gameCanvas.getMiddle(), // SHOULD be hero
            [0, 0]
          )
        )
      )
      .set(
        "bullets",
        createMultipleInstantiatedClasses(1, () =>
          bulletFactory(gameCanvas.getMiddle())
        )
      )
      .set(
        "text",
        createMultipleInstantiatedClasses(1, () =>
          textFactory({
            position: [190, 50],
            velocity: [0, 0],
            rotation: 0,
            text: `Score:
      Bullets left:`,
            textAlignment: "right",
            fillStyle: "'serif'",
            font: "'serif'",
            fontSize: 42,
          })
        )
      );
  }
}
