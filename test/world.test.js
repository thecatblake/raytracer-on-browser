const {PointLight} = require("../js/light");
const {point, vector} = require("../js/tuple");
const {Sphere, GlassSphere} = require("../js/sphere");
const {World, prepare_computation} = require("../js/world");
const {Ray} = require("../js/ray");
const {Intersection} = require("../js/intersection");
const {Plane} = require("../js/plane");
const {TestPattern} = require("../js/pattern");

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
  let c = w.shade_hit(comps, 1)

  expect(c.equals(vector(0.38066, 0.47583, 0.2855))).toBeTruthy()
})

test("Shading an intersection from the inside", () => {
  let w = default_world()
  w.light.position = point(0, 0.25, 0)
  let r = new Ray(point(0, 0, 0), vector(0, 0, 1))
  let shape = w.objects[1]
  let i = new Intersection(0.5, shape)
  let comps = prepare_computation(i, r)
  let c = w.shade_hit(comps, 1)

  expect(c.equals(vector(0.90498, 0.90498, 0.90498))).toBeTruthy()
})

test("The color when a ray misses", () => {
  let w = default_world()
  let r = new Ray(point(0, 0, -5), vector(0, 1, 0))

  let c = w.color_at(r, 1)
  expect(c.equals(vector(0, 0, 0))).toBeTruthy()
})

test("The color when a ray hits", () => {
  let w = default_world()
  let r = new Ray(point(0, 0, -5), vector(0, 0, 1))

  let c = w.color_at(r, 1)
  expect(c.equals(vector(0.38066, 0.47583, 0.2855))).toBeTruthy()
})

test("The color with an intersection behind the ray", () => {
  let w = default_world()
  let outer = w.objects[0]
  outer.material.ambient = 1
  let inner = w.objects[1]
  inner.material.ambient = 1
  let r = new Ray(point(0, 0, 0.75), vector(0, 0, -1))

  let c = w.color_at(r, 1)
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
  let c = w.shade_hit(comps, 1)

  expect(c.equals(vector(0.1, 0.1, 0.1))).toBeTruthy()
})

test("The reflected color for a reflective material", () => {
  let w = default_world()
  let shape = new Plane()
  shape.material.reflective = 0.5
  shape.translate(vector(0, -1, 0))
  w.objects.push(shape)
  let r = new Ray(point(0, 0, -3), vector(0, -Math.sqrt(2)/2, Math.sqrt(2)/2))
  let i = new Intersection(Math.sqrt(2), shape)
  let comps = prepare_computation(i, r)
  let color = w.reflected_color(comps, 1)

  expect(color.equals(vector(0.19032, 0.2379, 0.14274))).toBeTruthy()
})

test("shade_hit() with a reflective material", () => {
  let w = default_world()
  let shape = new Plane()
  shape.material.reflective = 0.5
  shape.translate(vector(0, -1, 0))
  w.objects.push(shape)
  let r = new Ray(point(0, 0, -3), vector(0, -Math.sqrt(2)/2, Math.sqrt(2)/2))
  let i = new Intersection(Math.sqrt(2), shape)
  let comps = prepare_computation(i, r)
  let color = w.shade_hit(comps, 1)

  expect(color.equals(vector(0.87677, 0.92436, 0.82918))).toBeTruthy()
})

test("Finding n1 and n2 at various intersections", () => {
  let A = new GlassSphere()
  A.scale(vector(2,2,2))
  let B = new GlassSphere()
  B.translate(vector(0, 0, -0.25))
  B.material.refractive_index = 2.0
  let C = new GlassSphere()
  C.translate(vector(0, 0, 0.25))
  C.material.refractive_index = 2.5
  let r = new Ray(point(0, 0, -4), vector(0, 0, 1))
  let xs = [
    new Intersection(2, A),
    new Intersection(2.75, B),
    new Intersection(3.25, C),
    new Intersection(4.75, B),
    new Intersection(5.25, C),
    new Intersection(6, A)
  ]

  let ts =
    [
    [0, 1.0, 1.5],
      [1, 1.5, 2.0],
      [2, 2.0, 2.5],
      [3, 2.5, 2.5],
      [4, 2.5, 1.5],
      [5, 1.5, 1.0]
  ]

  ts.forEach(t => {
    let comps = prepare_computation(xs[t[0]], r, xs)

    expect(comps.n1).toBe(t[1])
    expect(comps.n2).toBe(t[2])
  })
})

test("The refracted color under total internal reflection", () => {
  let w = default_world()
  let shape = w.objects[0]
  shape.material.transparency = 1.0
  shape.material.refractive_index = 1.5
  let r = new Ray(point(0, 0, Math.sqrt(2)/2), vector(0, 1, 0))
  let xs = [
    new Intersection(-Math.sqrt(2)/2, shape),
    new Intersection(Math.sqrt(2)/2, shape)
  ]

  let comps = prepare_computation(xs[1], r, xs)
  let c = w.refracted_color(comps, 5)

  expect(c).toEqual(vector(0, 0, 0))
})

test("The refracted color with a refracted ray", () => {
  let w = default_world()
  let A = w.objects[0]
  A.material.ambient = 1.0
  A.material.pattern = new TestPattern()
  let B = w.objects[1]
  B.material.transparency = 1.0
  B.material.refractive_index = 1.5
  let r = new Ray(point(0, 0, 0.1), vector(0, 1, 0))
  let xs = [
    new Intersection(-0.9899, A),
    new Intersection(-0.4899, B),
    new Intersection(0.4899, B),
    new Intersection(0.9899, A)
  ]
  let comps = prepare_computation(xs[2], r, xs)
  let c = w.refracted_color(comps, 5)

  expect(c.equals(vector(0, 0.99888, 0.04725)))
})

test("shade_hit() with a transparent material", () => {
  let w = default_world()
  let floor = new Plane()
  floor.translate(vector(0, -1, 0))
  floor.material.transparency = 0.5
  floor.material.refractive_index = 1.5
  let ball = new Sphere()
  ball.material.color = vector(1, 0, 0)
  ball.material.ambient = 0.5
  ball.translate(vector(0, -2.5, -0.5))
  w.objects.push(floor)
  w.objects.push(ball)

  let r = new Ray(point(0, 0, -3), vector(0, -Math.sqrt(2)/2, Math.sqrt(2)/2))
  let xs = [
    new Intersection(Math.sqrt(2), floor)
  ]
  let comps = prepare_computation(xs[0], r, xs)
  let color = w.shade_hit(comps, 5)

  expect(color.equals(vector(0.93642, 0.68642, 0.68642)))
})
