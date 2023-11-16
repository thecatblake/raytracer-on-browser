const {Canvas} = require("./canvas");
const {point, vector} = require("./tuple");
const {Sphere} = require("./sphere");
const {PointLight} = require("./light");
const {World} = require("./world");
const {Camera} = require("./camera");
const {view_transform, scaling_matrix} = require("./matrix");
const {Plane} = require("./plane");
const {StripePattern} = require("./pattern");

function draw_plane() {
  const canvasElement = document.getElementById("canvas")

  const canvas = new Canvas(canvasElement)

  let pattern = new StripePattern(vector(0, 0, 0), vector(1, 1, 1))
  pattern.transform = scaling_matrix(vector(0.5, 1, 1))

  let floor = new Plane()
  floor.material.color = vector(1, 0.9, 0.9)
  floor.material.specular = 0
  floor.material.reflective = 0.8
  floor.material.pattern = pattern

  let middle = new Sphere()
  middle.translate(vector(-0.5, 1, 0.5))
  middle.material.reflective = 0.5
  middle.material.color = vector(0, 0, 1)

  let right = new Sphere()
  right.scale(vector(0.5, 0.5, 0.5)).translate(vector(1.5, 0.5, -0.5))
  right.material.color = vector(0, 1, 0)
  //right.material.reflective = 0.5

  let left = new Sphere()
  left.scale(vector(0.33, 0.33, 0.33)).translate(vector(-1.5, 0.33, -0.75))
  left.material.color = vector(1, 0, 0)
  //left.material.reflective = 0.5

  let light = new PointLight(point(-10, 10, -10), vector(1, 1, 1))

  let w = new World([floor, middle, right, left], light)

  let c = new Camera(canvas.h, canvas.w, Math.PI/3)
  c.transform = view_transform(point(0, 1.5, -5), point(0, 1, 0), vector(0, 1, 0))

  c.render(canvas, w)

  canvas.draw()
}


module.exports = {draw_plane}
