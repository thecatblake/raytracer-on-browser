import {Canvas} from "./canvas";

import {Sphere} from "./sphere";

import {point, vector} from "./tuple";


import {PointLight} from "./light";

import {World} from "./world";

import {Camera} from "./camera";

import {view_transform} from "./matrix";


function draw_sphere() {
  const canvasElement = document.getElementById("canvas")

  const canvas = new Canvas(canvasElement)

  let floor = new Sphere()
  floor.scale(vector(10, 0.01, 10))
  floor.material.color = vector(1, 0.9, 0.9)
  floor.material.specular = 0

  let left_wall = new Sphere()
  left_wall.scale(vector(10, 0.01, 10)).rotate_x(Math.PI/2).rotate_y(-Math.PI/4).translate(vector(0, 0, 5))
  left_wall.material = floor.material

  let right_wall = new Sphere()
  right_wall.scale(vector(10, 0.01, 10)).rotate_x(Math.PI/2).rotate_y(Math.PI/4).translate(vector(0, 0, 5))
  right_wall.material = floor.material

  let middle = new Sphere()
  middle.translate(vector(-0.5, 1, 0.5))
  middle.material.color = vector(0, 0, 1)

  let right = new Sphere()
  right.scale(vector(0.5, 0.5, 0.5)).translate(vector(1.5, 0.5, -0.5))
  right.material.color = vector(0, 1, 0)

  let left = new Sphere()
  left.scale(vector(0.33, 0.33, 0.33)).translate(vector(-1.5, 0.33, -0.75))
  left.material.color = vector(1, 0, 0)

  let light = new PointLight(point(-10, 10, -10), vector(1, 1, 1))

  let w = new World([floor, left_wall, right_wall, middle, right, left], light)

  let c = new Camera(canvas.h, canvas.w, Math.PI/3)
  c.transform = view_transform(point(0, 1.5, -5), point(0, 1, 0), vector(0, 1, 0))

  c.render(canvas, w)

  canvas.draw()
}


export {draw_sphere}
