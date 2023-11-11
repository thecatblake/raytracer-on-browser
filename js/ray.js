const {Tuple} = require("./tuple")

class Ray {
  origin = null
  direction = null
  constructor(origin, direction) {
    this.origin = origin
    this.direction = direction
  }

  at(t) {
    return Tuple.add(this.origin, this.direction.sc_mul(t))
  }

  transform(M) {
    return new Ray(M.mul(this.origin), M.mul(this.direction))
  }
}

module.exports = {Ray}
