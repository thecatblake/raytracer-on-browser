const {Plane} = require("../js/plane");
const {point, vector} = require("../js/tuple");
const {Ray} = require("../js/ray");
const {compare_double} = require("../js/util");
test("The normal of a plane is constant everywhere", () => {
  let p = new Plane()
  let n1 = p.local_normal_at(point(0, 0, 0))
  let n2 = p.local_normal_at(point(10, 0, -10))
  let n3 = p.local_normal_at(point(-5, 0, 150))

  expect(n1.equals(vector(0, 1, 0))).toBeTruthy()
  expect(n2.equals(vector(0, 1, 0))).toBeTruthy()
  expect(n3.equals(vector(0, 1, 0))).toBeTruthy()
})

test("Intersect with a ray parallel to the plane", () => {
  let p = new Plane()
  let r = new Ray(point(0, 10, 0), vector(0, 0, 1))
  let xs = p.local_intersect(r)

  expect(xs.length).toBe(0)
})

test("A ray intersecting a plane form above", () => {
  let p = new Plane()
  let r = new Ray(point(0, 1, 0), vector(0, -1, 0))
  let xs = p.local_intersect(r)

  expect(xs.length).toBe(1)
  expect(compare_double(xs[0].t, 1)).toBeTruthy()
  expect(xs[0].obj).toBe(p)
})

test("A ray intersecting a plane form below", () => {
  let p = new Plane()
  let r = new Ray(point(0, -1, 0), vector(0, 1, 0))
  let xs = p.local_intersect(r)

  expect(xs.length).toBe(1)
  expect(compare_double(xs[0].t, 1)).toBeTruthy()
  expect(xs[0].obj).toBe(p)
})

