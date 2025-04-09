import Rectangle from './Rectangle.js'

class Slider extends Rectangle {
  constructor (x, y, w, h, dx, dy) {
    super(x, y, w, h)
    this.x0 = x
    this.y0 = y
    this.dx = dx
    this.dy = dy
    this.xQueue = x
    this.yQueue = y
  }

  valueY () {
    return 1 - (this.y - this.y0 + this.dy) / (this.dy * 2)
  }

  drawContour (context) {
    context.fillStyle = "black"

    context.fillRect(
      this.x0 - this.dx,
      this.y0 - this.dy,
      this.dx * 2 + this.w,
      this.dy * 2 + this.h
    )
  }

  drawIt (context) {
    context.fillStyle = "white"

    context.fillRect(this.x, this.y, this.w, this.h)
  }

  update (x, y) {
    this.xQueue = Math.min(x, this.x0 + this.dx)
    this.xQueue = Math.max(this.xQueue, this.x0 - this.dx)
    this.yQueue = Math.min(y, this.y0 + this.dy)
    this.yQueue = Math.max(this.yQueue, this.y0 - this.dy)
  }

  updateDraw (context) {
    this.x = this.xQueue
    this.y = this.yQueue
    this.drawContour(context)
    this.drawIt(context)
  }
}

export default Slider
