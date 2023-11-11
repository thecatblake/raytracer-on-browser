const {Canvas} = require("./canvas");
const {point, Tuple, vector} = require("./tuple");
const {Ray} = require("./ray");
const {Sphere} = require("./sphere");
const {PointLight, lighting} = require("./light");
const {Intersection} = require("./intersection");

function draw_sphere() {
  const canvasElement = document.getElementById("canvas")

  const canvas = new Canvas(canvasElement)

  let origin = point(0, 0, -1000)
  let w_half = Math.floor(canvas.w / 2)
  let h_half = Math.floor(canvas.h / 2)

  let s = new Sphere()
  s.material.color = vector(1, 0.2, 1)
  s.scale(vector(100, 100, 100))

  let light = new PointLight(point(-1000, 1000, -1000), vector(1, 1, 1))

  for(let y=-h_half; y < h_half; y++) {
    for(let x = -w_half; x < w_half; x++) {
      let p = point(x, y, 0)
      let r = new Ray(origin, Tuple.sub(p, origin).normalize())

      let xs = s.intersect(r)

      let eye = r.direction.neg()

      if(xs.length === 0)
        continue

      p = r.at(Intersection.hit(xs).t)
      let normal = s.normal_at(p)

      let color = lighting(xs[0].obj.material, light, p, eye, normal)
      canvas.write_pixel(x + w_half, h_half - y, color)
    }
  }

  canvas.draw()
}


module.exports = {draw_sphere}
