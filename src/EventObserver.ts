/**
 * You keep a list of objects that want to get the message when an event happens.
 * When the event happens, you iterate through the list, sending the event message
 * to every object registered to receive it. Each object will process the message however
 * they need to. If a listener no longer needs to receive the message, you unregister it.
 *
 * const playerDied = new PubSub();
 *
 * playerDied.subscribe((message: string) => console.log(message.length));
 * playerDied.subscribe((message: string) => playSoundModule(message));
 * playerDied.subscribe(() => console.log("sound > play player dead!"));
 * playerDied.subscribe(() => console.log("graphics > make player spin around!"));
 *
 * playerDied.emit("player died!")
 */

export class PubSub<T> {
  public readonly handlers: Set<(v: T) => void> = new Set(); // make private in production

  subscribe(fn: (event: T) => void): void {
    this.handlers.add(fn);
  }

  unsubscribe(fn: (event: T) => void): void {
    this.handlers.delete(fn);
  }

  emit(event: T): void {
    this.handlers.forEach((fn) => fn(event));
  }
}
