const {Matrix, identity, translation_matrix, scaling_matrix, rotation_x_matrix, rotation_y_matrix, rotation_z_matrix} = require("../js/matrix")
const {Tuple, point, vector} = require("../js/tuple");

test("Multiplying two matrices", () => {
  let A = new Matrix([
    1, 2, 3, 4,
    5, 6, 7, 8,
    9, 8, 7, 6,
    5, 4, 3, 2
  ])

  let B = new Matrix([
    -2, 1, 2, 3,
    3, 2, 1, -1,
    4, 3, 6, 5,
    1, 2, 7, 8
  ])

  let T = new Matrix([
    20, 22, 50, 48,
    44, 54, 114, 108,
    40, 58, 110, 102,
    16, 26, 46, 42
  ])

  expect(Matrix.mul(A, B)).toEqual(T)
})

test("A matrix multiplied by a tuple", () => {
  let A = new Matrix([
    1, 2, 3, 4,
    2, 4, 4, 2,
    8, 6, 4, 1,
    0, 0, 0, 1
  ])

  let b = new Tuple(1, 2, 3, 1)

  let t = new Tuple(18, 24, 33, 1)

  expect(A.mul(b)).toEqual(t)
})

test("Multiplying a matrix by the identity matrix", () => {
  let A = new Matrix([
    0, 1, 2, 4,
    1, 2, 4, 8,
    2, 4, 8, 16,
    4, 8, 16, 32
  ])

  expect(A.mul(identity)).toEqual(A)
})

test("Transposing a matrix", () => {
  let A = new Matrix([
    0, 9, 3, 0,
    9, 8, 0, 8,
    1, 8, 5, 3,
    0, 0, 5, 8
  ])

  let T = new Matrix([
    0, 9, 1, 0,
    9, 8, 8, 0,
    3, 0, 5, 5,
    0, 8, 3, 8
  ])

  expect(A.T()).toEqual(T)
})

test("Calculating the determinant of a 4x4 matrix", () => {
  let A = new Matrix([
    -2, -8, 3, 5,
    -3, 1, 7, 3,
    1, 2, -9, 6,
    -6, 7, 7, -9
  ])

  expect(A.det()).toBe(-4071)
})

test("Calculating the inverse of a 4x4 matrix", () => {
  let A = new Matrix([
    8, -5, 9, 2,
    7, 5, 6, 1,
    -6, 0, 9, 6,
    -3, 0, -9, -4
  ])

  expect(Matrix.mul(A, A.inverse()).equals(identity)).toBeTruthy()
})

test("Multiplying by a translation matrix", () => {
  let p = point(1, 0, 0)
  let A = translation_matrix(vector(1, 1, 1))

  expect(A.mul(p)).toEqual(point(2, 1, 1))
})

test("Translation does not affect vectors", () => {
  let p = vector(1, 0, 0)
  let A = translation_matrix(vector(1, 1, 1))

  expect(A.mul(p)).toEqual(p)
})

test("Multiplying by a scaling matrix", () => {
  let p = point(1, 0, 0)
  let A = scaling_matrix(vector(2, 2, 2))

  expect(A.mul(p)).toEqual(point(2, 0, 0))
})

test("Multiplying by a rotation x matrix", () => {
  let p = point(1, 1, 1)
  let A = rotation_x_matrix(Math.PI / 2)

  expect(A.mul(p).equals(point(1, -1, 1))).toBeTruthy()
})

test("Multiplying by a rotation y matrix", () => {
  let p = point(1, 1, 1)
  let A = rotation_y_matrix(Math.PI / 2)

  expect(A.mul(p).equals(point(1, 1, -1))).toBeTruthy()
})

test("Multiplying by a rotation z matrix", () => {
  let p = point(1, 1, 1)
  let A = rotation_z_matrix(Math.PI / 2)

  expect(A.mul(p).equals(point(-1, 1, 1))).toBeTruthy()
})
