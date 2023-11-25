import {Object3D} from "./object3d";

import {Tuple} from "./tuple";

import {Intersection} from "./intersection";


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

export {Sphere, GlassSphere}
