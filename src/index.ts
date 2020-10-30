import {
  bulletFactory,
  heroFactory,
  levelTextFactory,
  zombieFactory,
} from "./factories";
import { GameCanvas } from "./GameCanvas";
import { PubSub } from "./EventObserver";
import { NewWorld } from "./newWorld";
import { calculateCenter } from "./helperFunctions";
import { checkCollision } from "./collisionDetection";
import levelData from "./levelData.json"; // snowpack creates proxy file

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
  const newWorld = new NewWorld(
    EntityKeys.map((x) => x),
    { level: 1 }
  );

  // Pubsub
  const bulletFiredPubSub = new PubSub<string>();

  /** Hero */
  newWorld.getEntityGroup("hero")?.push(
    heroFactory(
      gameCanvas.getMiddle(),
      bulletFiredPubSub // hero can emit event
    )
  );

  /** Text */
  newWorld.getEntityGroup("text")?.push(
    levelTextFactory(
      `Level: ${newWorld.level}
    Bullets left:`
    )
  );

  /** Bullets */
  function addBullet() {
    const hero = newWorld.getEntityGroup("hero");
    if (hero) {
      newWorld.getEntityGroup("bullets")?.push(
        bulletFactory({
          position: calculateCenter(hero[0]),
          rotation: hero[0].rotation,
        })
      );
    }
  }
  bulletFiredPubSub.subscribe(() => addBullet()); // bullets can act on hero event

  /** Zombies */
  async function makeZombies() {
    newWorld.getEntityGroup("zombies")?.push(
      await zombieFactory(
        gameCanvas.getWidthHeight(),
        gameCanvas.getMiddle(), // TODO SHOULD be hero.position somehow
        [0, 0]
      )
    );
  }
  for (let index = 0; index < levelData.level1.zombies; index += 1) {
    makeZombies();
  }

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
main();
