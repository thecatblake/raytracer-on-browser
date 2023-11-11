const {
  identity,
  rotation_x_matrix,
  rotation_y_matrix,
  rotation_z_matrix,
  scaling_matrix,
  translation_matrix
} = require("./matrix")
const {Intersection} = require("./intersection");

class Object3D {
  transform = identity

  intersect() {
    return new Intersection(0, null)
  }

  translate(v) {
    this.transform = this.transform.mul(translation_matrix(v))
    return this
  }

  scale(v) {
    this.transform = this.transform.mul(scaling_matrix(v))
    return this
  }

  rotate_x(rad) {
    this.transform = this.transform.mul(rotation_x_matrix(rad))
    return this
  }

  rotate_y(rad) {
    this.transform = this.transform.mul(rotation_y_matrix(rad))
    return this
  }

  rotate_z(rad) {
    this.transform = this.transform.mul(rotation_z_matrix(rad))
    return this
  }
}

module.exports = {Object3D}
