const {Object3D} = require("./object3d");
const {EPSILON} = require("./util");
const {Intersection} = require("./intersection");
const {vector} = require("./tuple");

class Plane extends Object3D {
  local_intersect(ray) {
    if(Math.abs(ray.direction.y) < EPSILON)
      return []

    let t = -ray.origin.y / ray.direction.y;

    return [new Intersection(t, this)]
  }

  local_normal_at(p) {
    return vector(0, 1, 0)
  }
}

module.exports = {Plane}
