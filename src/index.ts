import { GameCanvas } from "./Canvas";
import { createMultipleInstantiatedClasses } from "./helperFunctions";
import {
  heroFactory,
  zombieFactory,
  bulletFactory,
  textFactory,
} from "./factories";

/**
 * Create gameCanvas and set to aspect ratio corrected current window size
 */
const ratio = 4 / 3;
export const gameCanvas = new GameCanvas(
  document.getElementById("game-canvas"),
  window.innerWidth / window.innerWidth > ratio
    ? // window width is too wide relative to desired game width
      [window.innerWidth * ratio, window.innerWidth]
    : // window height is too high relative to desired game height
      [window.innerWidth, window.innerWidth / ratio]
);

// let [canvasWidth, canvasHeight] = gameCanvas.getWidthHeight();
// export const middle: Vector2 = [(canvasWidth /= 2), (canvasHeight /= 2)];

/**
 * Create entities
 */
export const hero = heroFactory(gameCanvas.getMiddle());
// PROBLEM it is not running random properly as only used once! HOW?! It is random somehow
const zombies = createMultipleInstantiatedClasses(44, () =>
  zombieFactory(
    gameCanvas.getMiddle(),
    gameCanvas.getWidthHeight(),
    hero.position,
    [0, 0]
  )
);
const bullets = createMultipleInstantiatedClasses(1, () =>
  bulletFactory(gameCanvas.getMiddle())
);
const onScreenText = textFactory({
  position: [190, 50],
  velocity: [0, 0],
  rotation: 0,
  text: `Score:
  Bullets left:`,
  textAlignment: "right",
  fillStyle: "'serif'",
  font: "'serif'",
  fontSize: 42,
});

/**
 * Game loop
 */
function gameLoop(): void {
  requestAnimationFrame(gameLoop);
  gameCanvas.clearScreen();
  // test to check there is one in the array :)
  // Object.entries(world.entities).forEach(([key, value]) => value[0].update());
  hero.draw(gameCanvas);
  hero.update();
  zombies.forEach((zombie) => {
    zombie.draw(gameCanvas);
    zombie.update();
  });
  bullets.forEach((bullet) => {
    bullet.draw(gameCanvas);
    bullet.update();
  });
  onScreenText.draw(gameCanvas);
  onScreenText.update();
}
gameLoop();
