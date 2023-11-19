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
    let refracted = this.refracted_color(comps, remaining)

    let material = comps.obj.material
    if (material.reflective > 0 && material.transparency > 0) {
      let reflectance = schlick(comps)
      return surface.add(reflected.sc_mul(reflectance)).add(refracted.sc_mul(1-reflectance))
    }
    return surface.add(reflected).add(refracted)
  }

  color_at(r, remaining=5) {
    let intersections = this.intersect(r)
    let hit = Intersection.hit(intersections)

    if(hit == null)
      return vector(0, 0, 0)

    let comps = prepare_computation(hit, r, intersections)
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

  refracted_color(comps, remaining=5) {
    if(remaining <= 0)
      return vector(0, 0, 0)
    if(comps.obj.material.transparency === 0)
      return vector(0, 0, 0)

    let n_ratio = comps.n1 / comps.n2
    let cos_i = Tuple.dot(comps.eyev, comps.normalv)
    let sin2_t = n_ratio*n_ratio * (1-cos_i*cos_i)

    if(sin2_t >= 1)
      return vector(0, 0, 0)

    let cos_t = Math.sqrt(1.0 - sin2_t)
    let direction = Tuple.sub(comps.normalv.sc_mul(n_ratio*cos_i - cos_t), comps.eyev.sc_mul(n_ratio))

    let refracted_ray = new Ray(comps.under_point, direction)
    let color = this.color_at(refracted_ray, remaining-1)

    return color.sc_mul(comps.obj.material.transparency)
  }
}

function prepare_computation(intersection, ray, intersections=[]) {
  let p = ray.at(intersection.t)

  let comps = {
    t: intersection.t,
    obj: intersection.obj,
    point: p,
    eyev: ray.direction.neg(),
    normalv: intersection.obj.normal_at(p),
    inside: false,
  }

  let containers = []
  for (let i of intersections) {
    if (i === intersection) {
      if (containers.length === 0)
        comps.n1 = 1.0
      else
        comps.n1 = containers[containers.length - 1].material.refractive_index
    }

    let idx = containers.indexOf(i.obj)

    if(idx !== -1)
      containers.splice(idx, 1)
    else
      containers.push(i.obj)

    if (i === intersection) {
      if(containers.length === 0)
        comps.n2 = 1.0
      else
        comps.n2 = containers[containers.length - 1].material.refractive_index
    }
  }

  if(Tuple.dot(comps.normalv, comps.eyev) < 0) {
    comps.inside = true
    comps.normalv = comps.normalv.neg()
  }

  comps.reflectv = ray.direction.reflect(comps.normalv)
  comps.over_point = Tuple.add(comps.point, comps.normalv.sc_mul(EPSILON))
  comps.under_point = Tuple.sub(comps.point, comps.normalv.sc_mul((EPSILON)))

  return comps
}

function schlick(comps) {
  let cos = Tuple.dot(comps.eyev, comps.normalv)
  if(comps.n1 > comps.n2) {
    let n = comps.n1 / comps.n2
    let sin2_t = n*n *(1 -cos*cos)
    if (sin2_t > 1.0)
      return 1.0

    cos = Math.sqrt(1.0 - sin2_t)
  }

  let r0 = ((comps.n1 - comps.n2) / (comps.n1 + comps.n2)) ** 2
  return r0 + (1 - r0) * (1 - cos) ** 5
}

module.exports = {World, prepare_computation}
