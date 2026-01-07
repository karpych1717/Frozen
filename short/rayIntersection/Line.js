import Vector from './Vector.js'

class Line {
  constructor (x0, y0, x1, y1) {
    this.x0 = x0
    this.y0 = y0
    this.dx = x1 - x0
    this.dy = y1 - x1

    this.len2 = this.dx ** 2 + this.dy ** 2
    this.dx_normalized = this.dx / this.len2
    this.dy_normalized = this.dy / this.len2
  }

  update(x0, y0, x1, y1) {
    this.x0 = x0
    this.y0 = y0
    this.dx = x1 - x0
    this.dy = y1 - x1

    this.len2 = this.dx ** 2 + this.dy ** 2
    this.dx_normalized = this.dx / this.len2
    this.dy_normalized = this.dy / this.len2
  }

  intersectX(x) {
    let t = (x - this.x0) / this.dx_normalized
    return new Vector(x, this.y0 + this.dy_normalized * t)
  }

  intersectY(y) {
    let t = (y - this.y0) / this.dy_normalized
    return new Vector(this.x0 + this.dx_normalized * t, y)
  }
}

export default Line