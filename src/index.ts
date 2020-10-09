import { GameCanvas } from "./Canvas";
import { World } from "./World";

const ratio = 4 / 3;
export const gameCanvas = new GameCanvas(
  document.getElementById("game-canvas"),
  window.innerWidth / window.innerWidth > ratio
    ? // window width is too wide relative to desired game width
      [window.innerWidth * ratio, window.innerWidth]
    : // window height is too high relative to desired game height
      [window.innerWidth, window.innerWidth / ratio]
);

const world = new World(gameCanvas, { numberOfZombies: 10 });
/**
 * Game loop
 */
function gameLoop(): void {
  requestAnimationFrame(gameLoop);

  gameCanvas.clearScreen();
  world.entities.forEach((entityContainer) => {
    entityContainer.forEach((entity) => {
      entity.update();
      entity.draw(gameCanvas);
    });
  });
  world.checkCollision("zombies", "bullets");
}

gameLoop();
