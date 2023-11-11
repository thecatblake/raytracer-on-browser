const {point, vector} = require("./tuple");
const {Canvas} = require("./canvas")

function draw_trajectory() {
  const canvasElement = document.getElementById("canvas")

  const canvas = new Canvas(canvasElement)

  let start = point(0, 1, 0)
  let v = vector(1, 1.0, 0).normalize().sc_mul(11.25)
  let gravity = vector(0, -0.1, 0)
  let wind = vector(-0.01, 0, 0)

  for(let i=0; i < 100000; i++) {
    let t = i / 1000
    let velocity = v.add(gravity.sc_mul(t)).add(wind)
    let position = start.add(velocity.sc_mul(t)).floor()

    canvas.write_pixel(position.x, canvas.h - position.y, vector(1, 1, 1))
  }

  canvas.draw()
}

module.exports = {draw_trajectory}
