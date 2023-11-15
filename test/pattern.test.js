const {Sphere} = require("../js/sphere");
const {vector, point} = require("../js/tuple");
const {TestPattern} = require("../js/pattern");
const {scaling_matrix} = require("../js/matrix");
test("A pattern with an object transformation", () => {
  let shape = new Sphere()
  shape.scale(vector(2, 2, 2))
  let pattern = new TestPattern()

  let c = pattern.at_obj(shape, point(2, 3, 4))

  expect(c.equals(vector(1, 1.5, 2))).toBeTruthy()
})

test("A pattern wit ha pattern transformation", () => {
  let shape = new Sphere()
  let pattern = new TestPattern()
  pattern.transform = scaling_matrix(vector(2, 2, 2))

  let c = pattern.at_obj(shape, point(2, 3, 4))

  expect(c.equals(vector(1, 1.5, 2))).toBeTruthy()
})
