const {vector} = require("./tuple");
const {identity} = require("./matrix");


class Pattern {
  transform = identity

  at_obj(obj, world_point) {
    let object_point = obj.transform.inverse().mul(world_point)
    let pattern_point = this.transform.inverse().mul(object_point)
    return this.at(pattern_point)
  }

  at(point) {
    return vector(0, 0, 0)
  }
}
class TestPattern extends Pattern {
  at(point) {
    return vector(point.x, point.y, point.z)
  }
}

class StripePattern {
  a = vector(0, 0, 0)
  b  = vector(1, 1, 1)
  transform = identity

  constructor(a, b) {
    this.a = a
    this.b = b
  }

  at(point) {
    if(Math.floor(point.x) % 2 === 0)
      return this.a
    return this.b
  }

  at_obj(obj, world_point) {
    let object_point = obj.transform.inverse().mul(world_point)
    let pattern_point = this.transform.inverse().mul(object_point)
    return this.at(pattern_point)
  }
}


module.exports = {TestPattern, StripePattern}
