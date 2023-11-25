import {point, vector} from "./tuple";

import {Canvas} from "./canvas";


function draw_trajectory() {
  const canvasElement = document.getElementById("canvas")

  const canvas = new Canvas(canvasElement)

  let start = point(0, 1, 0)
  let v = vector(1, 3.0, 0).normalize().sc_mul(11.25)
  let gravity = vector(0, -0.1, 0)
  let wind = vector(-0.01, 0, 0)

  for(let i=0; i < 1000000; i++) {
    let t = i / 1000
    let velocity = v.add(gravity.sc_mul(t)).add(wind)
    let position = start.add(velocity.sc_mul(t)).floor()

    canvas.write_pixel(position.x, canvas.h - position.y, vector(1, 1, 1))
  }

  canvas.draw()
}

export {draw_trajectory}
