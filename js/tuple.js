const {compare_double} = require("./util");

class Tuple {
  x = 0;
  y = 0;
  z = 0;
  w = 0;

  constructor(x, y, z, w) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
  }

  add(other) {
    return new Tuple(this.x + other.x, this.y + other.y, this.z + other.z, this.w + other.w)
  }

  static add(a, b) {
    return a.add(b)
  }

  sub(other)  {
    return new Tuple(this.x - other.x, this.y - other.y, this.z - other.z, this.w - other.w)
  }

  static sub(a, b) {
    return a.sub(b)
  }

  mul(other) {
    return new Tuple(this.x * other.x, this.y * other.y, this.z * other.z, this.w * other.w)
  }

  sc_mul(x) {
    return new Tuple(this.x * x, this.y * x, this.z * x, this.w * x)
  }

  static mul(a, b) {
    return a.mul(b)
  }

  div(other) {
    return new Tuple(this.x / other.x, this.y / other.y, this.z / other.z, this.w / other.w)
  }

  static div(a, b) {
    return a.div(b)
  }

  neg() {
    return new Tuple(-this.x, -this.y, -this.z, -this.w)
  }

  magnitude() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z)
  }

  normalize() {
    let mag = this.magnitude()
    return new Tuple(this.x / mag, this.y / mag, this.z / mag, this.w / mag)
  }

  dot(other) {
    return this.x * other.x + this.y * other.y + this.z * other.z
  }

  static dot(a, b) {
    return a.dot(b)
  }

  cross(other) {
    return new Tuple(this.y*other.z - this.z*other.y, this.z*other.x - this.x*other.z, this.x*other.y - this.y*other.x, 0)
  }

  static cross(a, b) {
    return a.cross(b)
  }

  floor() {
    return new Tuple(Math.floor(this.x), Math.floor(this.y), Math.floor(this.z), Math.floor(this.w))
  }

  equals(other) {
    return compare_double(this.x, other.x) &&
      compare_double(this.y, other.y) &&
      compare_double(this.z, other.z) &&
      compare_double(this.w, other.w)
  }
}

function point(x, y, z) {
  return new Tuple(x, y, z, 1)
}

function vector(x, y, z) {
  return new Tuple(x, y, z, 0)
}

module.exports = {Tuple, point, vector}
