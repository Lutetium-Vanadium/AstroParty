class Vector {
  // Properties
  get angle() {
    return Math.atan2(this.y, this.x);
  }
  set angle(angle) {
    const magnitude = this.magnitude;
    this.x = Math.cos(angle) * magnitude;
    this.y = Math.sin(angle) * magnitude;
    this.magnitude = magnitude;
  }

  get magnitude() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
  set magnitude(magnitude) {
    this.x = Math.cos(this.angle) * magnitude;
    this.y = Math.sin(this.angle) * magnitude;
  }

  get reverse() {
    return new Vector(-this.x, -this.y);
  }

  // Constructors
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  static fromVector(vector) {
    return new this(vector.x, vector.y);
  }

  static fromPolar(magnitude, angle) {
    const x = Math.cos(angle) * magnitude;
    const y = Math.sin(angle) * magnitude;
    return new this(x, y);
  }

  static null() {
    return new this(0, 0);
  }

  // Vector based functions
  add(vector) {
    this.x += vector.x;
    this.y += vector.y;
  }

  sub(vector) {
    this.x -= vector.x;
    this.y -= vector.y;
  }

  mult(num) {
    this.x *= num;
    this.y *= num;
  }

  dot(vector) {
    this.x *= vector.x;
    this.y *= vector.y;
  }
}

export default Vector;

// A helper function for creating vectors on the fly, as writing `new Vector` may be bulky
export const vec = (x, y) => new Vector(x, y);
