const {Object3D} = require("./object3d");
const {Tuple} = require("./tuple");
const {Intersection} = require("./intersection");

class Sphere extends Object3D {
  intersect(ray) {
    let r = ray.transform(this.transform.inverse())
    let a = Tuple.dot(r.direction, r.direction)
    let b = Tuple.dot(r.origin, r.direction)
    let c = Tuple.dot(r.origin, r.origin) - 1

    let discriminant = b*b - a*c

    if(discriminant < 0)
      return []

    let s_d = Math.sqrt(discriminant)

    return [
      new Intersection((-b - s_d)/a, this),
      new Intersection((-b + s_d)/a, this)
    ]
  }

  normal_at(p) {
    let object_normal = this.transform.inverse().mul(p)
    let world_normal = this.transform.inverse().T().mul(object_normal)
    return world_normal.normalize()
  }
}

module.exports = {Sphere}
