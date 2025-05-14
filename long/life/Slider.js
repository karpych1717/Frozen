import Rectangle from './Rectangle.js'

class Slider extends Rectangle {
  constructor (x, y, w, h, v) {
    super(x, y, w, h)
    this.v = v
  }

  value () {
    return this.v
  }

  drawIt (context) {
    context.fillStyle = "black"
    context.fillRect(this.x, this.y, this.w, this.h)
    context.fillStyle = "white"
    context.fillRect(this.x, this.y + (this.h - this.w) * this.v, this.w, this.w)
  }

  update (x, y) {
    this.v = Math.min(Math.max((y - this.y - this.w / 2) / (this.h - this.w), 0), 1)
  }

  updateByClick (x, y) {
    if (this.isOverIt(x, y)) {
      this.update(x, y)
    }
  }
}

export default Slider
