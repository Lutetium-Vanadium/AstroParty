class Vector {
  // Properties
  get angle() {
    return Math.atan(this.y / this.x);
  }
  set angle(angle) {
    this.x = Math.cos(angle) * this.magnitude;
    this.y = Math.sin(angle) * this.magnitude;
  }

  get magnitude() {
    return Math.sqrt(x * x + y * y);
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
    this.x = vector.x;
    this.y = vector.y;
  }

  static fromPolar(magnitude, angle) {
    this.angle = angle;
    this.magnitude = magnitude;
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
