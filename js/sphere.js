const {Object3D} = require("./object3d");
const {Tuple} = require("./tuple");
const {Intersection} = require("./intersection");

class Sphere extends Object3D {
  local_intersect(ray) {
    let a = Tuple.dot(ray.direction, ray.direction)
    let b = Tuple.dot(ray.origin, ray.direction)
    let c = Tuple.dot(ray.origin, ray.origin) - 1

    let discriminant = b*b - a*c

    if(discriminant < 0)
      return []

    let s_d = Math.sqrt(discriminant)

    return [
      new Intersection((-b - s_d)/a, this),
      new Intersection((-b + s_d)/a, this)
    ]
  }

  local_normal_at(p) {
    return p
  }
}

class GlassSphere extends Sphere {
  constructor() {
    super()
    this.material.transparency = 1.0
    this.material.refractive_index = 1.5
  }
}

module.exports = {Sphere, GlassSphere}
