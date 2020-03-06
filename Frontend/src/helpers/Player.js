import Sprite from "./Sprite";
import Vector from "./Vector";

const PLAYER_HEIGHT = window.innerWidth / 13;

class Player extends Sprite {
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

    this.isPlayer = true;
    this.sprite.scale.set(PLAYER_HEIGHT / texture.orig.height);
  }
}

export default Player;
