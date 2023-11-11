const {Tuple, point, vector} = require("../js/tuple")
const {compare_double} = require("../js/util")

test("point() creates tuples with w=1", () => {
  let p = point(4, 4, -3)

  expect(p).toEqual(new Tuple(4, 4, -3, 1))
})

test("vector() creates tuples with w=1", () => {
  let p = vector(4, 4, -3)

  expect(p).toEqual(new Tuple(4, 4, -3, 0))
})

test("adding two tuples", () => {
  let a1 = new Tuple(3, -2, 5, 1)
  let a2 = new Tuple(-2, 3, 1, 0)

  let t = new Tuple(1, 1, 6, 1)

  expect(a1.add(a2)).toEqual(t)
  expect(Tuple.add(a1, a2)).toEqual(t)
})

test("subtracting two tuples", () => {
  let a1 = point(3, 2, 1)
  let a2 = point(5, 6, 7)

  let t = vector(-2, -4, -6)

  expect(a1.sub(a2)).toEqual(t)
  expect(Tuple.sub(a1, a2)).toEqual(t)
})

test("elementwise multiplying two tuples", () => {
  let a1 = new Tuple(3, -2, 5, 1)
  let a2 = new Tuple(-2, 3, 1, 0)

  let t = vector(-6, -6, 5)

  expect(a1.mul(a2)).toEqual(t)
  expect(Tuple.mul(a1, a2)).toEqual(t)
})

test("scalar multiplication of two vectors", () => {
  let v = new Tuple(3, -2, 5, 1)

  expect(v.sc_mul(2)).toEqual(new Tuple(6, -4, 10, 2))
})

test("elementwise dividing two tuples", () => {
  let a1 = new Tuple(3, -2, 5, 1)
  let a2 = new Tuple(-2, 3, 1, 1)

  let t = new Tuple(3/-2, -2/3, 5, 1)

  expect(a1.div(a2)).toEqual(t)
  expect(Tuple.div(a1, a2)).toEqual(t)
})

test("negating a tuple", () => {
  let a = new Tuple(1, -2, 3, -4)

  expect(a.neg()).toEqual(new Tuple(-1, 2, -3, 4))
})

test("computing the magnitude", () => {
  let v = vector(-1, -2, -3)

  expect(compare_double(v.magnitude(), Math.sqrt(14))).toBeTruthy()
})

test("normalizing vector", () => {
  let v = vector(1, 2, 3)

  expect(v.normalize().magnitude()).toBe(1)
})

test("The dot product of two tuples", () => {
  let a = vector(1,2,3)
  let b = vector(2, 3, 4)

  expect(a.dot(b)).toBe(20)
  expect(Tuple.dot(a, b)).toBe(20)
})

test("The cross product of two vectors", () => {
  let a = vector(1, 2, 3)
  let b = vector(2, 3, 4)

  let t1 = vector(-1, 2, -1)
  let t2 = vector(1, -2, 1)

  expect(a.cross(b)).toEqual(t1)
  expect(Tuple.cross(a, b)).toEqual(t1)
  expect(b.cross(a)).toEqual(t2)
  expect(Tuple.cross(b, a)).toEqual(t2)

})

test("Reflecting a vector off a slanted sruface", () => {
  let v = vector(0, -1, 0)
  let n = vector(Math.sqrt(2)/2, Math.sqrt(2)/2, 0)

  expect(v.reflect(n).equals(vector(1, 0, 0)))
})
