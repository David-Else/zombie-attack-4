import type { PubSub } from "../EventObserver";
import type { GameCanvas, VectorDrawable } from "../Canvas";
import type { Vector2 } from "../helperFunctions";
import { KeyboardInputable } from "../components/KeyboardInputable";

export class Hero implements VectorDrawable {
  readonly position;
  readonly velocity: Vector2 = [0, 0];
  rotation = 0;
  readonly fill = "red";
  readonly widthHeight: Vector2 = [65, 25];
  bulletFiredPubSub;
  private readonly keyboardInput;

  constructor(position: Vector2, bulletFiredPubSub: PubSub<string>) {
    this.position = position;
    this.keyboardInput = new KeyboardInputable();
    this.bulletFiredPubSub = bulletFiredPubSub;
    // bulletFiredPubSub.subscribe((message: string) => this.sayHello(message));
  }

  draw(gC: Readonly<GameCanvas>): void {
    gC.drawRectangle(this);
  }

  update(): void {
    if (this.keyboardInput.keysPressed.right) {
      this.rotation += 1;
    }
    if (this.keyboardInput.keysPressed.left) {
      this.rotation -= 1;
    }
    this.checkFire();
  }

  private checkFire() {
    if (!this.keyboardInput.keysPressed.fire) {
      this.keyboardInput.keysPressed.firePaused = false;
    }

    if (
      this.keyboardInput.keysPressed.fire &&
      // world.numberOfBullets > 0 &&
      !this.keyboardInput.keysPressed.firePaused
    ) {
      // pause the firing until the fire key is released
      this.keyboardInput.keysPressed.firePaused = true;
      this.bulletFiredPubSub.emit("bullet fired!");
      console.log("should happen once");
    }
  }
}
