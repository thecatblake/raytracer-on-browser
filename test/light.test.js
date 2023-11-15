const {Material} = require("../js/material");
const {point, vector} = require("../js/tuple");
const {PointLight, lighting} = require("../js/light");

let settings = {
  m: new Material(),
  position: point(0, 0, 0)
}

test("Lighting with the eye between the light and the surface", () => {
  let eyev = vector(0, 0, -1)
  let normalv = vector(0, 0, -1)
  let light = new PointLight(point(0, 0, -10), vector(1, 1, 1))
  let result = lighting(settings.m, null, light, settings.position, eyev, normalv)

  expect(result.equals(vector(1.9, 1.9, 1.9))).toBeTruthy()
})

test("Lighting with the eye between light and surface, eye offset 45 deg", () => {
  let eyev = vector(0, Math.sqrt(2)/2, -Math.sqrt(2)/2)
  let normalv = vector(0, 0, -1)
  let light = new PointLight(point(0, 0, -10), vector(1, 1, 1))
  let result = lighting(settings.m, null, light, settings.position, eyev, normalv)

  expect(result.equals(vector(1.0, 1.0, 1.0))).toBeTruthy()
})

test("Lighting with eye opposite surface, light offset 45 deg", () => {
  let eyev = vector(0, 0, -1)
  let normalv = vector(0, 0, -1)
  let light = new PointLight(point(0, 10, -10), vector(1, 1, 1))
  let result = lighting(settings.m, null, light, settings.position, eyev, normalv)

  expect(result.equals(vector(0.7364, 0.7364, 0.7364))).toBeTruthy()
})

test("Lighting with eye in the path of the reflection vector", () => {
  let eyev = vector(0, -Math.sqrt(2)/2, -Math.sqrt(2)/2)
  let normalv = vector(0, 0, -1)
  let light = new PointLight(point(0, 10, -10), vector(1, 1, 1))
  let result = lighting(settings.m, null, light, settings.position, eyev, normalv)

  expect(result.equals(vector(1.6364, 1.6364, 1.6364))).toBeTruthy()
})

test("Lighting with the light behind the surface", () => {
  let eyev = vector(0, 0, -1)
  let normalv = vector(0, 0, -1)
  let light = new PointLight(point(0, 0, 10), vector(1, 1, 1))
  let result = lighting(settings.m, null, light, settings.position, eyev, normalv)

  expect(result.equals(vector(0.1, 0.1, 0.1))).toBeTruthy()
})
