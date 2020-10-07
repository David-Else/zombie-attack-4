import { createMultiple } from "./helperFunctions";
import {
  heroFactory,
  zombieFactory,
  bulletFactory,
  textFactory,
} from "./factories";
import type { GameCanvas } from "./Canvas";

interface Entity {
  update: () => void;
  draw: (gC: Readonly<GameCanvas>) => void;
}

export class World {
  entities;

  constructor(
    gameCanvas: Readonly<GameCanvas>,
    options: { numberOfZombies: number }
  ) {
    this.entities = new Map<string, Entity[]>();
    this.entities
      .set(
        "hero",
        createMultiple(1, () => heroFactory(gameCanvas.getMiddle()))
      )
      .set(
        "zombies",
        createMultiple(options.numberOfZombies, () =>
          zombieFactory(
            gameCanvas.getMiddle(),
            gameCanvas.getWidthHeight(),
            gameCanvas.getMiddle(), // TODO SHOULD be hero.position somehow
            [0, 0]
          )
        )
      )
      .set(
        "bullets",
        createMultiple(1, () => bulletFactory(gameCanvas.getMiddle()))
      )
      .set(
        "text",
        createMultiple(1, () =>
          textFactory({
            position: [190, 50],
            velocity: [0, 0],
            rotation: 0,
            text: `Score:
      Bullets left:`,
            textAlignment: "right",
            fillStyle: "serif",
            font: "serif",
            fontSize: 32,
          })
        )
      );
  }
}
