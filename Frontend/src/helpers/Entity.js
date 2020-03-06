import Sprite from "./Sprite";
import Vector from "./Vector";

class Entity extends Sprite {
  constructor(
    texture,
    pos = [0, 0],
    velMag = 0,
    angle = 0,
    omega = 0,
    decay = 0.7
  ) {
    const posVec = new Vector(pos[0], pos[1]);
    const velVec = Vector.fromPolar(velMag, angle);
    const accVec = Vector.null();

    super(texture, posVec, velVec, accVec, omega, 0, decay);

    this.isPlayer = false;
    this.sprite.scale.set(0.4 + (Math.random() / 10) * 0.1);
  }
}

export default Entity;
