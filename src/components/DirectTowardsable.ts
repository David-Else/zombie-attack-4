import { addVectors } from "../helperFunctions";
import type { Vector2 } from "../helperFunctions";
import type { Drawable } from "../GameCanvas";

export class DirectTowardsable {
  targetPosition;
  speed;

  constructor(targetPosition: Vector2, speed: number) {
    this.targetPosition = targetPosition;
    this.speed = speed;
  }

  public goTowardsTarget(parentObj: Drawable): void {
    // compute delta between the source point and the destination point
    const dx = this.targetPosition[0] - parentObj.position[0];
    const dy = this.targetPosition[1] - parentObj.position[1];

    // compute the angle between the two points
    const angle = Math.atan2(dy, dx);

    // compute the velocity vector through magnitude (speed) and the angle
    parentObj.velocity = [
      this.speed * Math.cos(angle),
      this.speed * Math.sin(angle),
    ];
    // Add the position to the velocity to move the object
    parentObj.position = addVectors(parentObj.position, parentObj.velocity);
  }
}
