const {Tuple} = require("./tuple");
const {compare_double} = require("./util");

class Matrix {
  elements = null

  constructor(elements) {
    if (elements)
      this.elements = elements
    else
      this.elements = new Array(16)
  }

  mul(other) {
    if (other instanceof Tuple)
      return new Tuple(
        this.elements[0] * other.x + this.elements[1] * other.y + this.elements[2] * other.z + this.elements[3] * other.w,
        this.elements[4] * other.x + this.elements[5] * other.y + this.elements[6] * other.z + this.elements[7] * other.w,
        this.elements[8] * other.x + this.elements[9] * other.y + this.elements[10] * other.z + this.elements[11] * other.w,
        this.elements[12] * other.x + this.elements[13] * other.y + this.elements[14] * other.z + this.elements[15] * other.w,
      )
    return new Matrix([
      this.elements[0] * other.elements[0] + this.elements[1] * other.elements[4] + this.elements[2] * other.elements[8] + this.elements[3] * other.elements[12],
      this.elements[0] * other.elements[1] + this.elements[1] * other.elements[5] + this.elements[2] * other.elements[9] + this.elements[3] * other.elements[13],
      this.elements[0] * other.elements[2] + this.elements[1] * other.elements[6] + this.elements[2] * other.elements[10] + this.elements[3] * other.elements[14],
      this.elements[0] * other.elements[3] + this.elements[1] * other.elements[7] + this.elements[2] * other.elements[11] + this.elements[3] * other.elements[15],
      this.elements[4] * other.elements[0] + this.elements[5] * other.elements[4] + this.elements[6] * other.elements[8] + this.elements[7] * other.elements[12],
      this.elements[4] * other.elements[1] + this.elements[5] * other.elements[5] + this.elements[6] * other.elements[9] + this.elements[7] * other.elements[13],
      this.elements[4] * other.elements[2] + this.elements[5] * other.elements[6] + this.elements[6] * other.elements[10] + this.elements[7] * other.elements[14],
      this.elements[4] * other.elements[3] + this.elements[5] * other.elements[7] + this.elements[6] * other.elements[11] + this.elements[7] * other.elements[15],
      this.elements[8] * other.elements[0] + this.elements[9] * other.elements[4] + this.elements[10] * other.elements[8] + this.elements[11] * other.elements[12],
      this.elements[8] * other.elements[1] + this.elements[9] * other.elements[5] + this.elements[10] * other.elements[9] + this.elements[11] * other.elements[13],
      this.elements[8] * other.elements[2] + this.elements[9] * other.elements[6] + this.elements[10] * other.elements[10] + this.elements[11] * other.elements[14],
      this.elements[8] * other.elements[3] + this.elements[9] * other.elements[7] + this.elements[10] * other.elements[11] + this.elements[11] * other.elements[15],
      this.elements[12] * other.elements[0] + this.elements[13] * other.elements[4] + this.elements[14] * other.elements[8] + this.elements[15] * other.elements[12],
      this.elements[12] * other.elements[1] + this.elements[13] * other.elements[5] + this.elements[14] * other.elements[9] + this.elements[15] * other.elements[13],
      this.elements[12] * other.elements[2] + this.elements[13] * other.elements[6] + this.elements[14] * other.elements[10] + this.elements[15] * other.elements[14],
      this.elements[12] * other.elements[3] + this.elements[13] * other.elements[7] + this.elements[14] * other.elements[11] + this.elements[15] * other.elements[15]
    ])
  }

  static mul(a, b) {
    return a.mul(b)
  }

  T() {
    return new Matrix([
      this.elements[0], this.elements[4], this.elements[8], this.elements[12],
      this.elements[1], this.elements[5], this.elements[9], this.elements[13],
      this.elements[2], this.elements[6], this.elements[10], this.elements[14],
      this.elements[3], this.elements[7], this.elements[11], this.elements[15]
    ])
  }

  det() {
    return this.elements[0] * (this.elements[5] * this.elements[10] * this.elements[15] -
        this.elements[5] * this.elements[11] * this.elements[14] -
        this.elements[9] * this.elements[6] * this.elements[15] +
        this.elements[9] * this.elements[7] * this.elements[14] +
        this.elements[13] * this.elements[6] * this.elements[11] -
        this.elements[13] * this.elements[7] * this.elements[10]) +
      this.elements[1] * (-this.elements[4] * this.elements[10] * this.elements[15] +
        this.elements[4] * this.elements[11] * this.elements[14] +
        this.elements[8] * this.elements[6] * this.elements[15] -
        this.elements[8] * this.elements[7] * this.elements[14] -
        this.elements[12] * this.elements[6] * this.elements[11] +
        this.elements[12] * this.elements[7] * this.elements[10]) +
      this.elements[2] * (this.elements[4] * this.elements[9] * this.elements[15] -
        this.elements[4] * this.elements[11] * this.elements[13] -
        this.elements[8] * this.elements[5] * this.elements[15] +
        this.elements[8] * this.elements[7] * this.elements[13] +
        this.elements[12] * this.elements[5] * this.elements[11] -
        this.elements[12] * this.elements[7] * this.elements[9]) +
      this.elements[3] * (-this.elements[4] * this.elements[9] * this.elements[14] +
        this.elements[4] * this.elements[10] * this.elements[13] +
        this.elements[8] * this.elements[5] * this.elements[14] -
        this.elements[8] * this.elements[6] * this.elements[13] -
        this.elements[12] * this.elements[5] * this.elements[10] +
        this.elements[12] * this.elements[6] * this.elements[9]);
  }

  inverse() {
    let inv = new Array(16)
    inv[0] = this.elements[5] * this.elements[10] * this.elements[15] -
      this.elements[5] * this.elements[11] * this.elements[14] -
      this.elements[9] * this.elements[6] * this.elements[15] +
      this.elements[9] * this.elements[7] * this.elements[14] +
      this.elements[13] * this.elements[6] * this.elements[11] -
      this.elements[13] * this.elements[7] * this.elements[10];

    inv[4] = -this.elements[4] * this.elements[10] * this.elements[15] +
      this.elements[4] * this.elements[11] * this.elements[14] +
      this.elements[8] * this.elements[6] * this.elements[15] -
      this.elements[8] * this.elements[7] * this.elements[14] -
      this.elements[12] * this.elements[6] * this.elements[11] +
      this.elements[12] * this.elements[7] * this.elements[10];

    inv[8] = this.elements[4] * this.elements[9] * this.elements[15] -
      this.elements[4] * this.elements[11] * this.elements[13] -
      this.elements[8] * this.elements[5] * this.elements[15] +
      this.elements[8] * this.elements[7] * this.elements[13] +
      this.elements[12] * this.elements[5] * this.elements[11] -
      this.elements[12] * this.elements[7] * this.elements[9];

    inv[12] = -this.elements[4] * this.elements[9] * this.elements[14] +
      this.elements[4] * this.elements[10] * this.elements[13] +
      this.elements[8] * this.elements[5] * this.elements[14] -
      this.elements[8] * this.elements[6] * this.elements[13] -
      this.elements[12] * this.elements[5] * this.elements[10] +
      this.elements[12] * this.elements[6] * this.elements[9];

    inv[1] = -this.elements[1] * this.elements[10] * this.elements[15] +
      this.elements[1] * this.elements[11] * this.elements[14] +
      this.elements[9] * this.elements[2] * this.elements[15] -
      this.elements[9] * this.elements[3] * this.elements[14] -
      this.elements[13] * this.elements[2] * this.elements[11] +
      this.elements[13] * this.elements[3] * this.elements[10];

    inv[5] = this.elements[0] * this.elements[10] * this.elements[15] -
      this.elements[0] * this.elements[11] * this.elements[14] -
      this.elements[8] * this.elements[2] * this.elements[15] +
      this.elements[8] * this.elements[3] * this.elements[14] +
      this.elements[12] * this.elements[2] * this.elements[11] -
      this.elements[12] * this.elements[3] * this.elements[10];

    inv[9] = -this.elements[0] * this.elements[9] * this.elements[15] +
      this.elements[0] * this.elements[11] * this.elements[13] +
      this.elements[8] * this.elements[1] * this.elements[15] -
      this.elements[8] * this.elements[3] * this.elements[13] -
      this.elements[12] * this.elements[1] * this.elements[11] +
      this.elements[12] * this.elements[3] * this.elements[9];

    inv[13] = this.elements[0] * this.elements[9] * this.elements[14] -
      this.elements[0] * this.elements[10] * this.elements[13] -
      this.elements[8] * this.elements[1] * this.elements[14] +
      this.elements[8] * this.elements[2] * this.elements[13] +
      this.elements[12] * this.elements[1] * this.elements[10] -
      this.elements[12] * this.elements[2] * this.elements[9];

    inv[2] = this.elements[1] * this.elements[6] * this.elements[15] -
      this.elements[1] * this.elements[7] * this.elements[14] -
      this.elements[5] * this.elements[2] * this.elements[15] +
      this.elements[5] * this.elements[3] * this.elements[14] +
      this.elements[13] * this.elements[2] * this.elements[7] -
      this.elements[13] * this.elements[3] * this.elements[6];

    inv[6] = -this.elements[0] * this.elements[6] * this.elements[15] +
      this.elements[0] * this.elements[7] * this.elements[14] +
      this.elements[4] * this.elements[2] * this.elements[15] -
      this.elements[4] * this.elements[3] * this.elements[14] -
      this.elements[12] * this.elements[2] * this.elements[7] +
      this.elements[12] * this.elements[3] * this.elements[6];

    inv[10] = this.elements[0] * this.elements[5] * this.elements[15] -
      this.elements[0] * this.elements[7] * this.elements[13] -
      this.elements[4] * this.elements[1] * this.elements[15] +
      this.elements[4] * this.elements[3] * this.elements[13] +
      this.elements[12] * this.elements[1] * this.elements[7] -
      this.elements[12] * this.elements[3] * this.elements[5];

    inv[14] = -this.elements[0] * this.elements[5] * this.elements[14] +
      this.elements[0] * this.elements[6] * this.elements[13] +
      this.elements[4] * this.elements[1] * this.elements[14] -
      this.elements[4] * this.elements[2] * this.elements[13] -
      this.elements[12] * this.elements[1] * this.elements[6] +
      this.elements[12] * this.elements[2] * this.elements[5];

    inv[3] = -this.elements[1] * this.elements[6] * this.elements[11] +
      this.elements[1] * this.elements[7] * this.elements[10] +
      this.elements[5] * this.elements[2] * this.elements[11] -
      this.elements[5] * this.elements[3] * this.elements[10] -
      this.elements[9] * this.elements[2] * this.elements[7] +
      this.elements[9] * this.elements[3] * this.elements[6];

    inv[7] = this.elements[0] * this.elements[6] * this.elements[11] -
      this.elements[0] * this.elements[7] * this.elements[10] -
      this.elements[4] * this.elements[2] * this.elements[11] +
      this.elements[4] * this.elements[3] * this.elements[10] +
      this.elements[8] * this.elements[2] * this.elements[7] -
      this.elements[8] * this.elements[3] * this.elements[6];

    inv[11] = -this.elements[0] * this.elements[5] * this.elements[11] +
      this.elements[0] * this.elements[7] * this.elements[9] +
      this.elements[4] * this.elements[1] * this.elements[11] -
      this.elements[4] * this.elements[3] * this.elements[9] -
      this.elements[8] * this.elements[1] * this.elements[7] +
      this.elements[8] * this.elements[3] * this.elements[5];

    inv[15] = this.elements[0] * this.elements[5] * this.elements[10] -
      this.elements[0] * this.elements[6] * this.elements[9] -
      this.elements[4] * this.elements[1] * this.elements[10] +
      this.elements[4] * this.elements[2] * this.elements[9] +
      this.elements[8] * this.elements[1] * this.elements[6] -
      this.elements[8] * this.elements[2] * this.elements[5];

    let det = this.elements[0] * inv[0] + this.elements[1] * inv[4] + this.elements[2] * inv[8] + this.elements[3] * inv[12];

    if (det === 0) {
      return null;
    }

    det = 1.0 / det;

    for (let i = 0; i < 16; i++)
      inv[i] = inv[i] * det;
    return new Matrix(inv)
  }

  equals(other) {
    return compare_double(this.elements[0], other.elements[0]) &&
      compare_double(this.elements[1], other.elements[1]) &&
      compare_double(this.elements[2], other.elements[2]) &&
      compare_double(this.elements[3], other.elements[3]) &&
      compare_double(this.elements[4], other.elements[4]) &&
      compare_double(this.elements[5], other.elements[5]) &&
      compare_double(this.elements[6], other.elements[6]) &&
      compare_double(this.elements[7], other.elements[7]) &&
      compare_double(this.elements[8], other.elements[8]) &&
      compare_double(this.elements[9], other.elements[9]) &&
      compare_double(this.elements[10], other.elements[10]) &&
      compare_double(this.elements[11], other.elements[11]) &&
      compare_double(this.elements[12], other.elements[12]) &&
      compare_double(this.elements[13], other.elements[13]) &&
      compare_double(this.elements[14], other.elements[14]) &&
      compare_double(this.elements[15], other.elements[15])
  }
}

const identity = new Matrix([
  1, 0, 0, 0,
  0, 1, 0, 0,
  0, 0, 1, 0,
  0, 0, 0, 1
])

function translation_matrix(v) {
  return new Matrix([
    1, 0, 0, v.x,
    0, 1, 0, v.y,
    0, 0, 1, v.z,
    0, 0, 0, 1
  ])
}

function scaling_matrix(v) {
  return new Matrix([
    v.x, 0, 0, 0,
    0, v.y, 0, 0,
    0, 0, v.z, 0,
    0, 0, 0, 1
  ])
}

function rotation_x_matrix(rad) {
  return new Matrix([
    1, 0, 0, 0,
    0, Math.cos(rad), -Math.sin(rad), 0,
    0, Math.sin(rad), Math.cos(rad), 0,
    0, 0, 0, 1
  ])
}

function rotation_y_matrix(rad) {
  return new Matrix([
    Math.cos(rad), 0, Math.sin(rad), 0,
    0, 1, 0, 0,
    -Math.sin(rad), 0, Math.cos(rad), 0,
    0, 0, 0, 1
  ])
}

function rotation_z_matrix(rad) {
  return new Matrix([
    Math.cos(rad), -Math.sin(rad), 0, 0,
    Math.sin(rad), Math.cos(rad), 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
  ])
}

function view_transform(from, to, up) {
  let forward = Tuple.sub(to, from).normalize()
  let left = Tuple.cross(forward, up.normalize())
  let true_up = Tuple.cross(left, forward)

  let orientation = new Matrix([
    left.x, left.y, left.z, 0,
    true_up.x, true_up.y, true_up.z, 0,
    -forward.x, -forward.y, -forward.z, 0,
    0, 0, 0, 1
  ]);

  return orientation.mul(translation_matrix(from.neg()))
}

module.exports = {Matrix, identity, translation_matrix, scaling_matrix, rotation_x_matrix, rotation_y_matrix, rotation_z_matrix, view_transform}
