const {Canvas} = require("./canvas");
const {point, Tuple, vector} = require("./tuple");
const {Ray} = require("./ray");
const {Sphere} = require("./sphere");

function draw_sphere() {
  const canvasElement = document.getElementById("canvas")

  const canvas = new Canvas(canvasElement)

  let origin = point(0, 0, -500)
  let w_half = Math.floor(canvas.w / 2)
  let h_half = Math.floor(canvas.h / 2)

  let s = new Sphere()
  s.scale(vector(100, 100, 100))

  for(let y=-h_half; y < h_half; y++) {
    for(let x = -w_half; x < w_half; x++) {
      let p = point(x, y, 0)
      let r = new Ray(origin, Tuple.sub(p, origin).normalize())

      let xs = s.intersect(r)

      if(xs.length === 0)
        continue

      canvas.write_pixel(x + w_half, h_half - y, vector(1, 1, 1))
    }
  }

  canvas.draw()
}


module.exports = {draw_sphere}
