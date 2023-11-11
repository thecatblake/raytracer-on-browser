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
