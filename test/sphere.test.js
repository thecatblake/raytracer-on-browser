const {Ray} = require("../js/ray");
const {vector, point} = require("../js/tuple");
const {Sphere} = require("../js/sphere");

test("A ray intersects a sphere at two points", () => {
  let ray = new Ray(point(0, 0, -5), vector(0, 0, 1))
  let s = new Sphere()
  let intersections = s.intersect(ray)

  expect(intersections.length).toBe(2)
  expect(intersections[0].t).toBe(4)
  expect(intersections[1].t).toBe(6)
})

test("A ray intersects a sphere at tangent", () => {
  let ray = new Ray(point(0, 1, -5), vector(0, 0, 1))
  let s = new Sphere()
  let intersections = s.intersect(ray)

  expect(intersections.length).toBe(2)
  expect(intersections[0].t).toBe(5)
  expect(intersections[1].t).toBe(5)
})

test("A ray misses a sphere", () => {
  let ray = new Ray(point(0, 2, -5), vector(0, 0, 1))
  let s = new Sphere()
  let intersections = s.intersect(ray)

  expect(intersections.length).toBe(0)
})

test("A ray originates inside a sphere", () => {
  let ray = new Ray(point(0, 0, 0), vector(0, 0, 1))
  let s = new Sphere()
  let intersections = s.intersect(ray)

  expect(intersections.length).toBe(2)
  expect(intersections[0].t).toBe(-1)
  expect(intersections[1].t).toBe(1)
})

test("A sphere behind a ray", () => {
  let ray = new Ray(point(0, 0, 5), vector(0, 0, 1))
  let s = new Sphere()
  let intersections = s.intersect(ray)

  expect(intersections.length).toBe(2)
  expect(intersections[0].t).toBe(-6)
  expect(intersections[1].t).toBe(-4)
})

test("Intersecting a scaled sphere with a ray", () => {
  let r = new Ray(point(0, 0, -5), vector(0, 0, 1))
  let s = new Sphere()
  s.scale(vector(2, 2, 2))
  let xs = s.intersect(r)

  expect(xs.length).toBe(2)
  expect(xs[0].t).toBe(3)
  expect(xs[1].t).toBe(7)
})

test("THe normal is a normalized vector", () => {
  let s = new Sphere()
  let n = s.normal_at(point(Math.sqrt(3), Math.sqrt(3), Math.sqrt(3)))

  expect(n.equals(vector(Math.sqrt(3)/3, Math.sqrt(3)/3, Math.sqrt(3)/3))).toBeTruthy()
})

test("Computing the normal on a translated sphere", () => {
  let s = new Sphere()
  s.translate(vector(0, 1, 0))
  let n = s.normal_at(point(0, 1.70711, -0.70711))

  expect(n.equals(vector(0, 0.70711, -0.70711))).toBeTruthy()
})

test("Computing the normal on a transformed sphere", () => {
  let s = new Sphere()
  s.rotate_z(Math.PI / 5).scale(vector(1, 0.5, 1))
  let n = s.normal_at(point(0, Math.sqrt(2)/2, -Math.sqrt(2)/2))

  expect(n.equals(vector(0, 0.97014, -0.24254))).toBeTruthy()
})
