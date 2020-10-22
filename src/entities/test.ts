function loadImage(filePath: string): Promise<HTMLImageElement> {
  const imageElement = new Image();
  imageElement.src = filePath;
  return new Promise<HTMLImageElement>((resolve, reject) => {
    imageElement.onload = () => resolve(imageElement);
    imageElement.onerror = reject;
  });
}

export class Zombie {
  image;
  name;

  constructor(image: HTMLImageElement, name: string) {
    this.image = image;
    this.name = name;
  }

  static async init(): Promise<Zombie> {
    const [zombieImage] = await Promise.all([
      loadImage("assets/zombie64-final.png"),
    ]);

    return new Zombie(zombieImage, "henry");
  }
}

(async () => {
  const zombie = await Zombie.init();
  console.log(zombie.image);
})();
