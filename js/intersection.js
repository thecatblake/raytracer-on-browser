class Intersection {
  t = 0.0
  obj = null

  constructor(t, obj) {
    this.t = t
    this.obj = obj
  }

  static hit(intersections) {
    let m = new Intersection(0, null)
    for(let intersection of intersections) {
      if(intersection.t > 0 && (m.t === 0 || intersection.t < m.t))
        m = intersection
    }

    if(m.obj == null)
      return null

    return m
  }
}

module.exports = {Intersection}
