import Vector from "./Vector";

class Sprite {
  constructor(texture, pos, vel = [0, 0], acc = [0, 0], decay = 0.7) {
    this.texture = texture;
    this.pos = new Vector(pos[0], pos[1]);
    this.vel = new Vector(vel[0], pos[1]);
    this.acc = new Vector(acc[0], acc[1]);
    this.decay = decay;
  }

  applyForce(force) {
    this.vel.add(force);
  }

  tick() {
    this.pos.add(this.vel);
    this.vel.add(this.acc);
    this.acc.mult(this.decay);
  }
}

export default Sprite;
