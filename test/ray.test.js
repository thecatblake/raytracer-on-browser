const {Ray} = require("../js/ray")
const {point, vector} = require("../js/tuple");
const {translation_matrix} = require("../js/matrix");

test("Computing a point from a distance", () => {
  let r = new Ray(point(2, 3, 4), vector(1, 0, 0))

  expect(r.at(0)).toEqual(point(2, 3, 4))
  expect(r.at(1)).toEqual(point(3, 3, 4))
  expect(r.at(-1)).toEqual(point(1, 3, 4))
  expect(r.at(2.5)).toEqual(point(4.5, 3, 4))
})

test("Translating a ray", () => {
  let r = new Ray(point(1, 2, 3), vector(0, 1, 0))
  let M = translation_matrix(vector(3, 4, 5))
  let r2 = r.transform(M)

  expect(r2.origin).toEqual(point(4, 6, 8))
  expect(r2.direction).toEqual(vector(0, 1, 0))
})
