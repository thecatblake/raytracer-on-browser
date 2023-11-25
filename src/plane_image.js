import {Canvas} from "./canvas";

import {point, vector} from "./tuple";

import {Sphere} from "./sphere";

import {PointLight} from "./light";

import {World} from "./world";

import {Camera} from "./camera";

import {scaling_matrix, view_transform} from "./matrix";

import {Plane} from "./plane";

import {StripePattern} from "./pattern";


function draw_plane() {
  const canvasElement = document.getElementById("canvas")

  const canvas = new Canvas(canvasElement)

  let pattern = new StripePattern(vector(0, 0, 0), vector(1, 1, 1))
  pattern.transform = scaling_matrix(vector(0.5, 1, 1))

  let floor = new Plane()
  floor.material.color = vector(1, 0.9, 0.9)
  floor.material.pattern = pattern

  let left_wall = new Plane()
  left_wall.rotate_x(Math.PI/2).rotate_y(-Math.PI/4).translate(vector(0, 0, 5))
  left_wall.material = floor.material

  let right_wall = new Plane()
  right_wall.rotate_x(Math.PI/2).rotate_y(Math.PI/4).translate(vector(0, 0, 5))
  right_wall.material = floor.material

  let middle = new Sphere()
  middle.translate(vector(0, 1, -5))
  middle.material.transparency = 1.0
  middle.material.refractive_index = 2
  middle.material.reflective = 1.0
  middle.material.specular = 0.0
  middle.material.diffuse = 0.9
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
  c.transform = view_transform(point(0, 1.5, -10), point(0, 1, 0), vector(0, 1, 0))

  c.render(canvas, w)

  canvas.draw()
}


export {draw_plane};
