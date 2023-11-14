const {PointLight} = require("../js/light");
const {point, vector} = require("../js/tuple");
const {Sphere} = require("../js/sphere");
const {World, prepare_computation} = require("../js/world");
const {Ray} = require("../js/ray");
const {Intersection} = require("../js/intersection");

function default_world() {
  let light = new PointLight(point(-10, 10, -10), vector(1, 1, 1))
  let s1 = new Sphere()
  s1.material.color = vector(0.8, 1.0, 0.6)
  s1.material.diffuse = 0.7
  s1.material.specular = 0.2

  let s2 = new Sphere()
  s2.scale(vector(0.5, 0.5, 0.5))

  return new World([s1, s2], light)
}

test("Intersect a world with a ray", () => {
  let w = default_world()
  let r = new Ray(point(0, 0, -5), vector(0, 0, 1))
  let xs = w.intersect(r)

  expect(xs.length).toBe(4)
  expect(xs[0].t).toBe(4)
  expect(xs[1].t).toBe(4.5)
  expect(xs[2].t).toBe(5.5)
  expect(xs[3].t).toBe(6)
})

test("Precomputing the state of an intersection", () => {
  let r = new Ray(point(0, 0, -5), vector(0, 0, 1))
  let shape = new Sphere()
  let i = new Intersection(4, shape)
  let comps = prepare_computation(i, r)

  expect(comps.t).toBe(i.t)
  expect(comps.obj).toEqual(i.obj)
  expect(comps.point.equals(point(0, 0, -1))).toBeTruthy()
  expect(comps.eyev.equals(vector(0, 0, -1))).toBeTruthy()
  expect(comps.normalv.equals(vector(0, 0, -1))).toBeTruthy()
})

test("The hit, when an intersection occurs on the inside", () => {
  let r = new Ray(point(0, 0, 0), vector(0, 0, 1))
  let shape = new Sphere()
  let i = new Intersection(1, shape)
  let comps = prepare_computation(i, r)

  expect(comps.point.equals(point(0, 0, 1))).toBeTruthy()
  expect(comps.eyev.equals(vector(0, 0, -1))).toBeTruthy()
  expect(comps.normalv.equals(vector(0, 0, -1))).toBeTruthy()
  expect(comps.inside).toBeTruthy()
})

test("Shading an intersection", () => {
  let w = default_world()
  let r = new Ray(point(0, 0, -5), vector(0, 0, 1))
  let shape = w.objects[0]
  let i = new Intersection(4, shape)
  let comps = prepare_computation(i, r)
  let c = w.shade_hit(comps)

  expect(c.equals(vector(0.38066, 0.47583, 0.2855))).toBeTruthy()
})

test("Shading an intersection from the inside", () => {
  let w = default_world()
  w.light.position = point(0, 0.25, 0)
  let r = new Ray(point(0, 0, 0), vector(0, 0, 1))
  let shape = w.objects[1]
  let i = new Intersection(0.5, shape)
  let comps = prepare_computation(i, r)
  let c = w.shade_hit(comps)

  expect(c.equals(vector(0.90498, 0.90498, 0.90498))).toBeTruthy()
})

test("The color when a ray misses", () => {
  let w = default_world()
  let r = new Ray(point(0, 0, -5), vector(0, 1, 0))

  let c = w.color_at(r)
  expect(c.equals(vector(0, 0, 0))).toBeTruthy()
})

test("The color when a ray hits", () => {
  let w = default_world()
  let r = new Ray(point(0, 0, -5), vector(0, 0, 1))

  let c = w.color_at(r)
  expect(c.equals(vector(0.38066, 0.47583, 0.2855))).toBeTruthy()
})

test("The color with an intersection behind the ray", () => {
  let w = default_world()
  let outer = w.objects[0]
  outer.material.ambient = 1
  let inner = w.objects[1]
  inner.material.ambient = 1
  let r = new Ray(point(0, 0, 0.75), vector(0, 0, -1))

  let c = w.color_at(r)
  expect(c.equals(inner.material.color)).toBeTruthy()
})

test("There is no shadow when nothing is collinear with point and light", () => {
  let w = default_world()
  let p = point(0, 10, 0)

  expect(w.is_shadowed(p)).toBeFalsy()
})

test("The shadow when an object is between point and the light", () => {
  let w = default_world()
  let p = point(10, -10, 10)

  expect(w.is_shadowed(p)).toBeTruthy()
})

test("There is no shadow when an object is behind the light", () => {
  let w = default_world()
  let p = point(-20, 20, -20)

  expect(w.is_shadowed(p)).toBeFalsy()
})

test("There is no shadow when an object is behind the point", () => {
  let w = default_world()
  let p = point(-2, 2, -2)

  expect(w.is_shadowed(p)).toBeFalsy()
})

test("shade_hit() is given an intersection in shadow", () => {
  let light = new PointLight(point(0, 0, -10), vector(1, 1, 1))
  let s1 = new Sphere()
  let s2 = new Sphere()
  s2.translate(vector(0, 0, 10))
  let w = new World([s1, s2], light)

  let r = new Ray(point(0, 0, 5), vector(0, 0, 1))
  let i = new Intersection(4, s2)
  let comps = prepare_computation(i, r)
  let c = w.shade_hit(comps)

  expect(c.equals(vector(0.1, 0.1, 0.1))).toBeTruthy()
})

