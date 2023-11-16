const {Tuple, vector} = require("./tuple");
const {lighting} = require("./light");
const {Intersection} = require("./intersection");
const {Ray} = require("./ray");
const {EPSILON} = require("./util");

class World {
  objects = []
  light = null

  constructor(objects, light) {
    this.objects = objects
    this.light = light
  }

  intersect(ray) {
    let intersections = []
    for(let obj of this.objects) {
      let xs = obj.intersect(ray)
      intersections = intersections.concat(xs)
    }

    return intersections.sort((a, b) => a.t - b.t)
  }

  shade_hit(comps, remaining) {
    let shadowed = this.is_shadowed(comps.over_point)
    let surface = lighting(comps.obj.material, comps.obj, this.light, comps.point, comps.eyev, comps.normalv, shadowed)
    let reflected = this.reflected_color(comps, remaining)
    return surface.add(reflected)
  }

  color_at(r, remaining=5) {
    let intersections = this.intersect(r)
    let hit = Intersection.hit(intersections)

    if(hit == null)
      return vector(0, 0, 0)

    let comps = prepare_computation(hit, r)
    return this.shade_hit(comps, remaining)
  }

  is_shadowed(point) {
    let v = Tuple.sub(this.light.position, point)
    let distance = v.magnitude()
    let direction = v.normalize()

    let r = new Ray(point, direction)
    let intersections = this.intersect(r)

    let h = Intersection.hit(intersections)

    return h && h.t < distance;
  }

  reflected_color(comps, remaining=5) {
    if(remaining <= 0)
      return vector(0, 0, 0)
    if (comps.obj.material.reflective === 0)
      return vector(0, 0, 0)

    let reflect_ray = new Ray(comps.over_point, comps.reflectv)
    let color = this.color_at(reflect_ray, remaining-1)
    return  color.sc_mul(comps.obj.material.reflective)
  }
}

function prepare_computation(intersection, ray) {
  let p = ray.at(intersection.t)

  let comps = {
    t: intersection.t,
    obj: intersection.obj,
    point: p,
    eyev: ray.direction.neg(),
    normalv: intersection.obj.normal_at(p),
    inside: false,
  }

  if(Tuple.dot(comps.normalv, comps.eyev) < 0) {
    comps.inside = true
    comps.normalv = comps.normalv.neg()
  }

  comps.reflectv = ray.direction.reflect(comps.normalv)
  comps.over_point = Tuple.add(comps.point, comps.normalv.sc_mul(EPSILON))

  return comps
}

module.exports = {World, prepare_computation}
