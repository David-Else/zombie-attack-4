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

export function loadImage(filePath: string): Promise<HTMLImageElement> {
  const imageElement = new Image();
  imageElement.src = filePath;
  return new Promise<HTMLImageElement>((resolve, reject) => {
    imageElement.onload = () => resolve(imageElement);
    imageElement.onerror = reject;
  });
}

async function main() {
  let testZombie;
  [testZombie] = await Promise.all([
    loadImage("http://localhost:8080/assets/zombie64-final.png"),
  ]);
  const world = new World(gameCanvas, {
    numberOfZombies: 10,
    zombieImage: testZombie,
  });
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
main();
