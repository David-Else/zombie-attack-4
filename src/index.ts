import {
  bulletFactory,
  heroFactory,
  textFactory,
  zombieFactory,
} from "./factories";
import { GameCanvas } from "./GameCanvas";
import { PubSub } from "./EventObserver";
import { NewWorld } from "./newWorld";
import { calculateCenter, createMultiple } from "./helperFunctions";
import { checkCollision } from "./collisionDetection";

const ratio = 4 / 3;
export const gameCanvas = new GameCanvas(
  document.getElementById("game-canvas"),
  window.innerWidth / window.innerWidth > ratio
    ? // window width is too wide relative to desired game width
      [window.innerWidth * ratio, window.innerWidth]
    : // window height is too high relative to desired game height
      [window.innerWidth, window.innerWidth / ratio]
);

function main() {
  const EntityKeys = ["hero", "zombies", "bullets", "text"] as const;
  type EntityKey = typeof EntityKeys[number]; // why can't i export?

  const newWorld = new NewWorld(EntityKeys.map((x) => x));
  const bulletFiredPubSub = new PubSub<string>();

  /** Add characters */

  /** Hero */
  if (newWorld.getEntityGroup("hero")) {
    newWorld.getEntityGroup("hero")?.push(
      heroFactory(
        gameCanvas.getMiddle(), // maybe inject this!
        bulletFiredPubSub
      )
    );
  }
  /** Text */
  if (newWorld.getEntityGroup("text")) {
    newWorld.getEntityGroup("text")?.push(
      textFactory({
        position: [190, 50],
        velocity: [0, 0],
        rotation: 0,
        text: `Level: ${newWorld.level}
Bullets left:`,
        textAlignment: "right",
        fillStyle: "serif",
        font: "serif",
        fontSize: 32,
        widthHeight: [0, 100],
      })
    );
  }
  /** Bullets */

  function addBullet() {
    const hero = newWorld.getEntityGroup("hero");
    if (hero) {
      // get possible undefined?
      newWorld.getEntityGroup("bullets")?.push(
        bulletFactory({
          position: calculateCenter(hero[0]),
          rotation: hero[0].rotation,
        })
      );
    }
  }

  /** Zombies */
  async function makeZombies() {
    if (newWorld.getEntityGroup("zombies")) {
      newWorld.getEntityGroup("zombies")?.push(
        await zombieFactory(
          gameCanvas.getWidthHeight(),
          gameCanvas.getMiddle(), // TODO SHOULD be hero.position somehow
          [0, 0]
        )
      );
    }
  }
  for (let index = 0; index < 10; index += 1) {
    makeZombies();
  }
  bulletFiredPubSub.subscribe(() => addBullet());
  /**
   * Game loop
   */
  function gameLoop(): void {
    requestAnimationFrame(gameLoop);
    gameCanvas.clearScreen();
    checkCollision(newWorld);
    newWorld.getAllEntities().forEach((entity) => {
      entity.update();
      entity.draw(gameCanvas);
    });
  }

  gameLoop();
}
// this is not optimal, read up on promises
main();
