const {vector} = require("./tuple");

class Canvas {
  w = 0
  h = 0
  canvas = null
  ctx = null
  pixels = null
  constructor(canvasDocument) {
    this.w = canvasDocument.width
    this.h = canvasDocument.height
    this.canvas = canvasDocument
    this.ctx = canvasDocument.getContext("2d")
    this.pixels = this.ctx.createImageData(this.w, this.h)

    this.initialize()
  }

  initialize() {
    for(let y=0; y < this.h; y++) {
      for(let x=0; x < this.w; x++) {
        this.write_pixel(x, y, vector(0, 0, 0))
      }
    }
    this.draw()
  }

  write_pixel(x, y, color) {
    let p = this.at(x,y)
    this.pixels.data[p] = color.x * 255.0
    this.pixels.data[p + 1] = color.y * 255.0
    this.pixels.data[p + 2] = color.z * 255.0
    this.pixels.data[p + 3] = 255.0
  }

  at(x, y) {
    return (y * this.w + x ) * 4
  }

  set(image) {
    this.pixels.data = image
  }

  draw() {
    this.ctx.putImageData(this.pixels, 0, 0)
  }
}


module.exports = {Canvas}
