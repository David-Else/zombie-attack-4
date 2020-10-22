import { GameCanvas } from "./GameCanvas";
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

function main() {
  // const [zombieImage] = await Promise.all([
  //   loadImage("assets/zombie64-final.png"),
  // ]);
  const world = new World(gameCanvas, {
    numberOfZombies: 10,
  });
  world.addHero();
  world.addZombies();
  world.addText();
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
    world.checkCollision();
  }

  gameLoop();
}
// this is not optimal, read up on promises
main();
