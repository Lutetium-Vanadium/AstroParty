import * as PIXI from "pixi.js";

class Sprite {
  constructor(texture, pos, vel, acc, omega, alpha, decay) {
    // Linear kinematics
    this.pos = pos;
    this.vel = vel;
    this.acc = acc;

    // Rotation kinematics
    this.omega = omega;
    this.alpha = alpha;

    // Equivalent to friction I guess
    this.decay = decay;

    this.sprite = new PIXI.Sprite(texture);
    this.updateSprite();
  }

  applyForce(force) {
    this.vel.add(force);
  }

  updateSprite() {
    this.sprite.rotation = (Math.PI + this.vel.angle) % (Math.PI * 2);
    this.sprite.x = this.pos.x;
    this.sprite.y = this.pos.y;
  }

  tick(bounds) {
    this.pos.add(this.vel);
    this.vel.add(this.acc);
    this.acc.mult(this.decay);

    this.vel.angle += this.omega;
    this.omega *= 0.9;

    if (this.pos.x < bounds.x - this.sprite.width) {
      this.pos.x = bounds.width;
    } else if (this.pos.x > bounds.x + bounds.width + this.sprite.width) {
      this.pos.x = -this.sprite.width;
    }

    if (this.pos.y < bounds.y - this.sprite.height) {
      this.pos.y = bounds.height;
    } else if (this.pos.y > bounds.y + bounds.height + this.sprite.height) {
      this.pos.y = -this.sprite.height;
    }
    this.alpha *= this.decay;

    this.updateSprite();
  }
}

export default Sprite;
