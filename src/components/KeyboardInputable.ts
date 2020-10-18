export class KeyboardInputable {
  keysPressed = {
    fire: false,
    firePaused: false,
    left: false,
    right: false,
    pause: false,
  };
  constructor() {
    document.addEventListener("keydown", this.keyHandler);
    document.addEventListener("keyup", this.keyHandler);
  }

  // handling keys in JS, what I'd be most-inclined to do is let the keyboard fire as many keydown and keyup events as it wants.
  // Instead of buffering that, have the only thing the key-event function does is tell a Keyboard object whether a key is down, or whether it is up.

  private readonly keyHandler = (event: KeyboardEvent): void => {
    switch (event.code) {
      case "KeyF":
        this.keysPressed.fire = event.type === "keydown";
        break;
      case "ArrowLeft":
        event.preventDefault();
        this.keysPressed.left = event.type === "keydown";
        break;
      case "ArrowRight":
        event.preventDefault();
        this.keysPressed.right = event.type === "keydown";
        break;
      case "KeyP":
        if (event.type === "keydown" && !event.repeat) {
          this.keysPressed.pause = !this.keysPressed.pause;
        }
        break;
      default:
    }
  };
}
