import {
  identity,
  rotation_x_matrix,
  rotation_y_matrix,
  rotation_z_matrix,
  scaling_matrix,
  translation_matrix
} from "./matrix";

import {Material} from "./material";


class Object3D {
  transform = identity
  material = new Material()

  intersect(ray) {
    let local_ray = ray.transform(this.transform.inverse())
    return this.local_intersect(local_ray)
  }

  local_intersect() {
    return []
  }

  normal_at(p) {
    let transform_inv = this.transform.inverse()
    let local_point = transform_inv.mul(p)
    let local_normal = this.local_normal_at(local_point)
    let world_normal = transform_inv.T().mul(local_normal)
    world_normal.w = 0
    return world_normal.normalize()
  }

  local_normal_at(p) {
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

export {Object3D};
