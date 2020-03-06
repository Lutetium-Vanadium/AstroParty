import * as PIXI from "pixi.js";

class Sprite {
  constructor(texture, pos, vel, acc, omega, alpha, decay) {
    // Linear kinematics
    this.pos = pos; // new Vector(pos[0], pos[1]);
    this.vel = vel; // new Vector(vel[0], vel[1]);
    this.acc = acc; // new Vector(acc[0], acc[1]);

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
    this.sprite.angle = this.vel.angle;
    this.sprite.x = this.pos.x;
    this.sprite.y = this.pos.y;
    this.sprite.rotation = -this.vel.angle - Math.PI / 2;
  }

  tick(bounds) {
    this.pos.add(this.vel);
    this.vel.add(this.acc);
    this.acc.mult(this.decay);

    this.vel.angle += this.omega;
    this.omega += this.alpha;

    if (this.pos.x < bounds.x) {
      this.pos.x += bounds.width;
    } else if (this.pos.x > bounds.x + bounds.width) {
      this.pos.x -= bounds.width;
    }

    if (this.pos.y < bounds.y) {
      this.pos.y += bounds.height;
    } else if (this.pos.y > bounds.y + bounds.height) {
      this.pos.y -= bounds.height;
    }
    this.alpha *= this.decay;

    this.updateSprite();
  }
}

export default Sprite;
