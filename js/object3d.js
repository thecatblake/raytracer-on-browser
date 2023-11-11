const {
  identity,
  rotation_x_matrix,
  rotation_y_matrix,
  rotation_z_matrix,
  scaling_matrix,
  translation_matrix
} = require("./matrix")
const {Intersection} = require("./intersection");
const {Material} = require("./material");

class Object3D {
  transform = identity
  material = new Material()

  intersect() {
    return new Intersection(0, null)
  }

  normal_at(p) {
    return p
  }

  translate(v) {
    this.transform = translation_matrix(v).mul(this.transform)
    return this
  }

  scale(v) {
    this.transform = scaling_matrix(v).mul(this.transform)
    return this
  }

  rotate_x(rad) {
    this.transform = rotation_x_matrix(rad).mul(this.transform)
    return this
  }

  rotate_y(rad) {
    this.transform = rotation_y_matrix(rad).mul(this.transform)
    return this
  }

  rotate_z(rad) {
    this.transform = rotation_z_matrix(rad).mul(this.transform)
    return this
  }
}

module.exports = {Object3D}
