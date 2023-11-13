const {Camera} = require("../js/camera");
const {vector, point} = require("../js/tuple");
const {translation_matrix, rotation_y_matrix} = require("../js/matrix");
const {compare_double} = require("../js/util");
test("The pixel size for a horizontal canvas", () => {
  let c = new Camera(200, 125, Math.PI / 2)

  expect(compare_double(c.pixel_size, 0.01)).toBeTruthy()
})

test("The pixel size for a vertical canvas", () => {
  let c = new Camera(125, 200, Math.PI / 2)

  expect(compare_double(c.pixel_size, 0.01)).toBeTruthy()
})

test("Constructing a ray through the center of the canvas", () => {
  let c = new Camera(201, 101, Math.PI/2)
  let r = c.ray_for_pixel(100, 50)

  expect(r.origin.equals(point(0, 0, 0))).toBeTruthy()
  expect(r.direction.equals(vector(0, 0, -1))).toBeTruthy()
})

test("Constructing a ray through a corner of the canvas", () => {
  let c = new Camera(201, 101, Math.PI/2)
  let r = c.ray_for_pixel(0, 0)

  expect(r.origin.equals(point(0, 0, 0))).toBeTruthy()
  expect(r.direction.equals(vector(0.66519, 0.33259, -0.66851))).toBeTruthy()
})

test("Constructing a ray when the camera is transformed", () => {
  let c = new Camera(201, 101, Math.PI/2)
  c.transform = rotation_y_matrix(Math.PI/4).mul(translation_matrix(vector(0, -2, 5)))
  let r = c.ray_for_pixel(100, 50)

  expect(r.origin.equals(point(0, 2, -5))).toBeTruthy()
  expect(r.direction.equals(vector(Math.sqrt(2)/2, 0, -Math.sqrt(2)/2))).toBeTruthy()
})
