const {identity} = require("./matrix");
const {point, Tuple} = require("./tuple");
const {Ray} = require("./ray");

class Camera {
  hsize = 0
  vsize = 0
  field_ov_view = 0
  half_height = 0
  half_width = 0
  pixel_size = 0
  transform = identity

  constructor(hsize, vsize, field_of_view) {
    this.hsize = hsize
    this.vsize = vsize
    this.field_of_view = field_of_view

    let half_view = Math.tan(this.field_of_view / 2);
    let aspect = this.hsize / this.vsize;

    if (aspect >= 1) {
      this.half_width = half_view;
      this.half_height = half_view / aspect;
    } else {
      this.half_width = half_view * aspect;
      this.half_height = half_view;
    }

    this.pixel_size = (this.half_width * 2) / this.hsize;
  }

  ray_for_pixel(px, py) {
    let xoffset = (px + 0.5) * this.pixel_size;
    let yoffset = (py + 0.5) * this.pixel_size;
    let world_x = this.half_width - xoffset;
    let world_y = this.half_height - yoffset;

    let pixel = this.transform.inverse().mul(point(world_x, world_y, -1));
    let origin = this.transform.inverse().mul(point(0, 0, 0));
    let direction = Tuple.sub(pixel, origin).normalize()

    return new Ray(origin, direction);
  }

  render(canvas, w) {
    for (let y=0; y < this.vsize; y++) {
      for (let x=0; x < this.hsize; x++) {
        let ray = this.ray_for_pixel(x, y)
        let c = w.color_at(ray, 5)
        canvas.write_pixel(x, y, c)
      }
    }
  }
}

module.exports = {Camera}
