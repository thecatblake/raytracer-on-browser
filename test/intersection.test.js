const {Sphere} = require("../js/sphere");
const {Intersection} = require("../js/intersection");
test("The hit when all intersections have positive t", () => {
  let s = new Sphere()
  let i1 = new Intersection(1, s)
  let i2 = new Intersection(2, s)
  let xs = [i1, i2]
  let i = Intersection.hit(xs)

  expect(i).toEqual(i1)
})

test("The hit when sine ubtersectubis have negative t", () => {
  let s = new Sphere()
  let i1 = new Intersection(-1, s)
  let i2 = new Intersection(1, s)
  let xs = [i1, i2]
  let i = Intersection.hit(xs)

  expect(i).toEqual(i2)
})

test("The hit when all intersections have negative t", () => {
  let s = new Sphere()
  let i1 = new Intersection(-2, s)
  let i2 = new Intersection(-1, s)
  let xs = [i1, i2]
  let i = Intersection.hit(xs)

  expect(i).toBe(null)
})

test("The hit is always the lowest non negative intersection", () => {
  let s = new Sphere()
  let i1 = new Intersection(5, s)
  let i2 = new Intersection(7, s)
  let i3 = new Intersection(-3, s)
  let i4 = new Intersection(2, s)
  let xs = [i1, i2, i3, i4]
  let i = Intersection.hit(xs)

  expect(i).toEqual(i4)
})
